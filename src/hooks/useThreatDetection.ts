import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ThreatAnalysis {
  threat_detected: boolean;
  threat_level: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  threat_type: string | null;
  confidence: number;
  warning_message: string;
  action: 'allow' | 'warn' | 'block';
  details: string;
  error?: string;
}

export interface ThreatLog {
  id: string;
  timestamp: Date;
  url: string;
  contentType: string;
  analysis: ThreatAnalysis;
}

export const useThreatDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<ThreatAnalysis | null>(null);
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>([]);
  const [stats, setStats] = useState({
    threatsBlocked: 0,
    scansCompleted: 0,
    safetyScore: 100,
  });

  const analyzeContent = useCallback(async (
    content: string,
    contentType: string = 'text',
    url?: string,
    userId?: string
  ): Promise<ThreatAnalysis> => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('threat-detection', {
        body: { content, contentType, url, userId }
      });

      if (error) {
        console.error('Threat detection error:', error);
        throw error;
      }

      const analysis = data as ThreatAnalysis;
      setLastAnalysis(analysis);
      
      // Update stats
      setStats(prev => ({
        threatsBlocked: prev.threatsBlocked + (analysis.threat_detected ? 1 : 0),
        scansCompleted: prev.scansCompleted + 1,
        safetyScore: Math.max(0, Math.min(100, 
          analysis.threat_detected 
            ? prev.safetyScore - (analysis.threat_level === 'critical' ? 10 : analysis.threat_level === 'high' ? 5 : 2)
            : Math.min(100, prev.safetyScore + 0.5)
        )),
      }));

      // Log threat if detected
      if (analysis.threat_detected) {
        const log: ThreatLog = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          url: url || 'N/A',
          contentType,
          analysis,
        };
        setThreatLogs(prev => [log, ...prev].slice(0, 50));
      }

      return analysis;
    } catch (err) {
      console.error('Analysis failed:', err);
      const fallbackAnalysis: ThreatAnalysis = {
        threat_detected: false,
        threat_level: 'safe',
        threat_type: null,
        confidence: 0,
        warning_message: 'Analysis unavailable',
        action: 'allow',
        details: 'Could not complete analysis',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
      setLastAnalysis(fallbackAnalysis);
      return fallbackAnalysis;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearLogs = useCallback(() => {
    setThreatLogs([]);
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      threatsBlocked: 0,
      scansCompleted: 0,
      safetyScore: 100,
    });
  }, []);

  return {
    analyzeContent,
    isAnalyzing,
    lastAnalysis,
    threatLogs,
    stats,
    clearLogs,
    resetStats,
  };
};
