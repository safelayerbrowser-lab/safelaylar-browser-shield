import { useState, useEffect } from "react";
import { Shield, ShieldCheck, ShieldAlert, ShieldX, Activity, Zap, Eye, Lock, Wifi, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/usePWAInstall";

interface ProtectionStatus {
  name: string;
  icon: React.ElementType;
  status: 'active' | 'scanning' | 'warning' | 'off';
  description: string;
}

const RealtimeShield = () => {
  const { isInstalled } = usePWAInstall();
  const [isActive, setIsActive] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [safetyScore, setSafetyScore] = useState(98);

  const protections: ProtectionStatus[] = [
    { name: "Anti-Grooming", icon: Eye, status: isActive ? 'active' : 'off', description: "Detecting manipulation patterns" },
    { name: "Phishing Shield", icon: ShieldCheck, status: isActive ? 'active' : 'off', description: "Blocking fake websites" },
    { name: "Scam Detection", icon: ShieldAlert, status: isActive ? 'active' : 'off', description: "Romance & financial fraud alerts" },
    { name: "Content Filter", icon: Lock, status: isActive ? 'active' : 'off', description: "Filtering harmful content" },
    { name: "Deepfake Alert", icon: Zap, status: isActive ? 'scanning' : 'off', description: "AI-generated media detection" },
    { name: "Network Guard", icon: Wifi, status: isActive ? 'active' : 'off', description: "Spyware & tracker blocking" },
  ];

  // Simulate real-time activity when installed
  useEffect(() => {
    if (isInstalled) {
      setIsActive(true);
      
      const scanInterval = setInterval(() => {
        setScanCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 2000);

      const threatInterval = setInterval(() => {
        if (Math.random() > 0.8) {
          setThreatsBlocked(prev => prev + 1);
        }
      }, 5000);

      return () => {
        clearInterval(scanInterval);
        clearInterval(threatInterval);
      };
    }
  }, [isInstalled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'scanning': return 'text-warning bg-warning/10';
      case 'warning': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'scanning': return 'bg-warning animate-pulse';
      case 'warning': return 'bg-accent';
      default: return 'bg-muted-foreground';
    }
  };

  if (!isInstalled) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <ShieldX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Protection Inactive</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Install SafeLaylar to activate real-time browser protection
        </p>
        <a 
          href="/install" 
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
        >
          <Globe className="w-4 h-4" />
          Install Now
        </a>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header with live status */}
      <div className="bg-gradient-to-r from-success/10 to-primary/10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldCheck className="w-6 h-6 text-success" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                Real-time Protection
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </h3>
              <p className="text-sm text-muted-foreground">All systems active</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">{safetyScore}%</div>
            <div className="text-xs text-muted-foreground">Safety Score</div>
          </div>
        </div>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <div className="p-4 text-center">
          <motion.div 
            className="text-xl font-bold text-foreground"
            key={scanCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {scanCount.toLocaleString()}
          </motion.div>
          <div className="text-xs text-muted-foreground">Pages Scanned</div>
        </div>
        <div className="p-4 text-center">
          <motion.div 
            className="text-xl font-bold text-accent"
            key={threatsBlocked}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {threatsBlocked}
          </motion.div>
          <div className="text-xs text-muted-foreground">Threats Blocked</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-xl font-bold text-success">6/6</div>
          <div className="text-xs text-muted-foreground">Active Shields</div>
        </div>
      </div>

      {/* Protection modules */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {protections.map((protection, index) => (
            <motion.div
              key={protection.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl ${getStatusColor(protection.status)} transition-colors`}
            >
              <div className="flex items-center gap-2 mb-1">
                <protection.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{protection.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ml-auto ${getStatusDot(protection.status)}`} />
              </div>
              <p className="text-xs opacity-70">{protection.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity indicator */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3 h-3" />
          <span>Monitoring your browsing in real-time</span>
          <motion.div
            className="ml-auto flex gap-0.5"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-1 h-3 bg-success rounded-full" />
            <span className="w-1 h-2 bg-success/70 rounded-full" />
            <span className="w-1 h-4 bg-success rounded-full" />
            <span className="w-1 h-2 bg-success/70 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeShield;
