import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const THREAT_DETECTION_PROMPT = `You are an AI threat detection system for SafeLaylar Browser Shield. Analyze the provided content and return a JSON response with threat analysis.

THREAT CATEGORIES:
- grooming: Online grooming patterns, manipulation, trust-building by strangers
- phishing: Fake websites, credential theft, deceptive links
- scam: Romance scams, financial fraud, lottery scams
- malware: Suspicious downloads, malicious scripts
- harassment: Cyberbullying, hate speech, threats
- explicit: Adult content, inappropriate material
- deepfake: AI-generated fake media
- spyware: Tracking attempts, data harvesting

RESPONSE FORMAT (JSON only, no markdown):
{
  "threat_detected": boolean,
  "threat_level": "safe" | "low" | "medium" | "high" | "critical",
  "threat_type": string | null,
  "confidence": number (0-100),
  "warning_message": string,
  "action": "allow" | "warn" | "block",
  "details": string
}

Analyze content thoroughly. Be protective but avoid false positives. Consider context.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, contentType, url, userId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("API key not configured");
    }

    console.log(`Analyzing content for user: ${userId || 'anonymous'}, type: ${contentType}`);

    const analysisPrompt = `Analyze this ${contentType || 'content'} for threats:
URL: ${url || 'N/A'}
Content: ${content?.substring(0, 2000) || 'No content provided'}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: THREAT_DETECTION_PROMPT },
          { role: "user", content: analysisPrompt },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            threat_detected: false,
            threat_level: "safe",
            error: "Rate limited - defaulting to safe",
            action: "allow"
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response
    let threatAnalysis;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      threatAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        threat_detected: false,
        threat_level: "safe",
        threat_type: null,
        confidence: 0,
        warning_message: "Unable to analyze content",
        action: "allow",
        details: "Analysis inconclusive"
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      threatAnalysis = {
        threat_detected: false,
        threat_level: "safe",
        threat_type: null,
        confidence: 0,
        warning_message: "Analysis completed",
        action: "allow",
        details: "No threats detected"
      };
    }

    console.log("Threat analysis result:", threatAnalysis);

    return new Response(JSON.stringify(threatAnalysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Threat detection error:", error);
    return new Response(
      JSON.stringify({
        threat_detected: false,
        threat_level: "safe",
        error: error instanceof Error ? error.message : "Unknown error",
        action: "allow"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
