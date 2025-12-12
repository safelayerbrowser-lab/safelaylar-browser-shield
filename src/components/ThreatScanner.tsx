import { useState } from "react";
import { Shield, Loader2, AlertTriangle, CheckCircle, XCircle, Search, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThreatDetection, ThreatAnalysis } from "@/hooks/useThreatDetection";
import { motion, AnimatePresence } from "framer-motion";

const ThreatScanner = () => {
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const { analyzeContent, isAnalyzing, lastAnalysis } = useThreatDetection();

  const handleUrlScan = async () => {
    if (!urlInput.trim()) return;
    await analyzeContent(urlInput, 'url', urlInput);
  };

  const handleTextScan = async () => {
    if (!textInput.trim()) return;
    await analyzeContent(textInput, 'text');
  };

  const getThreatLevelConfig = (level: string) => {
    switch (level) {
      case 'critical':
        return { color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle, label: 'Critical Threat' };
      case 'high':
        return { color: 'text-accent', bg: 'bg-accent/10', icon: AlertTriangle, label: 'High Risk' };
      case 'medium':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: AlertTriangle, label: 'Medium Risk' };
      case 'low':
        return { color: 'text-muted-foreground', bg: 'bg-muted', icon: Shield, label: 'Low Risk' };
      default:
        return { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle, label: 'Safe' };
    }
  };

  const ResultDisplay = ({ analysis }: { analysis: ThreatAnalysis }) => {
    const config = getThreatLevelConfig(analysis.threat_level);
    const Icon = config.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${config.bg} rounded-xl p-4 border border-current/10`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-semibold ${config.color}`}>{config.label}</span>
              {analysis.threat_type && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-foreground/10 text-foreground">
                  {analysis.threat_type}
                </span>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {analysis.confidence}% confidence
              </span>
            </div>
            <p className="text-sm text-foreground mb-2">{analysis.warning_message}</p>
            <p className="text-xs text-muted-foreground">{analysis.details}</p>
            
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                analysis.action === 'block' ? 'bg-destructive text-destructive-foreground' :
                analysis.action === 'warn' ? 'bg-warning text-warning-foreground' :
                'bg-success text-success-foreground'
              }`}>
                Action: {analysis.action.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Threat Scanner</CardTitle>
            <CardDescription>Scan URLs or text for potential threats</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              URL Scan
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Text Scan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter URL to scan (e.g., https://example.com)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleUrlScan} 
                disabled={isAnalyzing || !urlInput.trim()}
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Scan"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Check if a website is safe before visiting
            </p>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder="Paste suspicious message or content to analyze..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={4}
            />
            <Button 
              onClick={handleTextScan} 
              disabled={isAnalyzing || !textInput.trim()}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Analyze for Threats
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Detect grooming, scams, phishing attempts, or harmful content
            </p>
          </TabsContent>
        </Tabs>

        <AnimatePresence>
          {lastAnalysis && (
            <div className="mt-6">
              <ResultDisplay analysis={lastAnalysis} />
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ThreatScanner;
