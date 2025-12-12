import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, Apple, Chrome, Globe, Download as DownloadIcon, Check } from "lucide-react";
import { motion } from "framer-motion";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "@/hooks/use-toast";

const platforms = [
  {
    icon: Chrome,
    name: "Chrome",
    description: "Add to browser",
    primary: true,
  },
  {
    icon: Globe,
    name: "Firefox",
    description: "Add to browser",
    primary: true,
  },
  {
    icon: Apple,
    name: "Safari",
    description: "iOS 16.4+",
    primary: false,
  },
  {
    icon: Smartphone,
    name: "Android",
    description: "Install app",
    primary: false,
  },
];

const Download = () => {
  const navigate = useNavigate();
  const { isInstalled, isInstallable, promptInstall, canPrompt } = usePWAInstall();

  const handleInstallApp = async () => {
    if (canPrompt) {
      const result = await promptInstall();
      if (result.success) {
        toast({
          title: "Installing SafeLaylar",
          description: "The app is being installed to your device.",
        });
      }
    } else {
      navigate("/install");
    }
  };

  return (
    <section className="py-32 bg-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-background mb-6">
              Start protecting yourself today
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Free to download. Works on all platforms.
            </p>
          </motion.div>

          {/* Primary Install Button */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button
              size="lg"
              onClick={handleInstallApp}
              className="text-lg px-10 py-7 bg-background text-foreground hover:bg-background/90 rounded-full shadow-xl hover:shadow-2xl transition-all"
              disabled={isInstalled}
            >
              {isInstalled ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  App Installed
                </>
              ) : (
                <>
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Install SafeLaylar App
                </>
              )}
            </Button>
          </motion.div>

          {/* Platform buttons */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-background/50 mb-4">Or add browser extension:</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {platforms.map((platform, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigate("/install")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                    platform.primary
                      ? 'bg-background text-foreground hover:bg-background/90'
                      : 'bg-background/10 text-background border border-background/20 hover:bg-background/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <platform.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{platform.name}</div>
                    <div className={`text-xs ${platform.primary ? 'text-muted-foreground' : 'text-background/60'}`}>
                      {platform.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-background/70 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {["Free forever", "Works offline", "Auto-updates", "All platforms"].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Download;