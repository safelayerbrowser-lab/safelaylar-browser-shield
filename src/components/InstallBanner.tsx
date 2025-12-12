import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BANNER_DISMISSED_KEY = "safelaylar-install-banner-dismissed";

const InstallBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isInstallable, isInstalled, isIOS, promptInstall, canPrompt } = usePWAInstall();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if banner was dismissed
    const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    
    // Show banner after 3 seconds if not dismissed and not installed
    if (!isDismissed && !isInstalled) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  // Hide banner when app is installed
  useEffect(() => {
    if (isInstalled) {
      setIsVisible(false);
    }
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  const handleInstall = async () => {
    if (canPrompt) {
      const result = await promptInstall();
      if (result.success) {
        toast({
          title: "Installing SafeLaylar",
          description: "The app is being installed to your device.",
        });
        setIsVisible(false);
      }
    } else {
      navigate("/install");
      setIsVisible(false);
    }
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl shadow-elevated p-4">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="flex items-start gap-3 pr-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                {isIOS ? (
                  <Smartphone className="h-5 w-5 text-primary" />
                ) : (
                  <Download className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Install SafeLaylar
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {isIOS 
                    ? "Add to Home Screen for the best experience"
                    : "Install for offline access and faster loading"
                  }
                </p>
                
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="mr-2 h-3 w-3" />
                  Install Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallBanner;
