import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Download, Smartphone, Monitor, CheckCircle, ArrowLeft, Chrome, Globe, Apple } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { motion } from "framer-motion";

const Install = () => {
  const navigate = useNavigate();
  const { isInstalled, isInstallable, isIOS, promptInstall, canPrompt } = usePWAInstall();
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios');
    } else if (/android/.test(userAgent)) {
      setDeviceType('android');
    }
  }, []);

  const handleInstallClick = async () => {
    if (!canPrompt) {
      toast({
        title: "Installation not available",
        description: "Please follow the manual instructions below for your device.",
      });
      return;
    }

    const result = await promptInstall();
    if (result.success) {
      toast({
        title: "Installing SafeLaylar",
        description: "The app is being installed to your device.",
      });
    }
  };

  const iosInstructions = [
    "Tap the Share button at the bottom of Safari",
    "Scroll down and tap 'Add to Home Screen'",
    "Tap 'Add' in the top right corner",
    "SafeLaylar is now on your home screen!"
  ];

  const androidInstructions = [
    "Tap the menu (three dots) in your browser",
    "Select 'Add to Home screen' or 'Install app'",
    "Tap 'Add' or 'Install'",
    "SafeLaylar is now on your home screen!"
  ];

  const desktopInstructions = [
    "Look for the install icon in your browser's address bar",
    "Click the install button when prompted",
    "Or click 'Install SafeLaylar' below",
    "The app will open in its own window"
  ];

  const instructions = deviceType === 'ios' 
    ? iosInstructions 
    : deviceType === 'android' 
    ? androidInstructions 
    : desktopInstructions;

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <motion.div 
                className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-10 h-10 text-success" />
              </motion.div>
              <CardTitle className="text-2xl">SafeLaylar is Active!</CardTitle>
              <CardDescription>
                Real-time protection is now enabled on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-success/10 rounded-xl p-4 border border-success/20">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium text-success">All Protection Enabled</p>
                    <p className="text-sm text-muted-foreground">6 active shields protecting you</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/protection")} 
                className="w-full bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                <Shield className="mr-2 h-4 w-4" />
                Open Protection Dashboard
              </Button>
              <Button 
                onClick={() => navigate("/dashboard")} 
                variant="outline" 
                className="w-full"
              >
                Go to Full Dashboard
              </Button>
              <Button 
                onClick={() => navigate("/")} 
                variant="ghost" 
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-5xl mx-auto">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Install SafeLaylar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Install SafeLaylar on your device for the best experience. Works offline, loads instantly, and feels like a native app.
          </p>
        </motion.div>

        {/* Primary Install CTA */}
        {canPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-primary-foreground mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Download className="h-10 w-10 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Quick Install Available</h3>
                      <p className="text-primary-foreground/90">
                        One-click install – works on desktop & mobile
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleInstallClick}
                    size="lg"
                    className="flex-shrink-0 bg-background text-foreground hover:bg-background/90"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Install App Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Browser Extensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Add to Browser</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer group">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Chrome className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Chrome / Edge</h3>
                <p className="text-sm text-muted-foreground mb-3">Full browser protection</p>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Chrome
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer group">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Firefox</h3>
                <p className="text-sm text-muted-foreground mb-3">Browser extension</p>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Firefox
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer group">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Apple className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Safari</h3>
                <p className="text-sm text-muted-foreground mb-3">iOS 16.4+ & macOS</p>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Safari
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Device-specific instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="h-6 w-6 text-primary" />
                <CardTitle>Mobile Install</CardTitle>
              </div>
              <CardDescription>
                Install SafeLaylar directly to your phone's home screen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Monitor className="h-6 w-6 text-primary" />
                <CardTitle>Desktop Install</CardTitle>
              </div>
              <CardDescription>
                Install SafeLaylar as a desktop app for quick access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {desktopInstructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Install */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Install SafeLaylar?
          </h2>
          <div className="grid sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Always Protected</h3>
              <p className="text-sm text-muted-foreground">
                Quick access to your safety dashboard
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Works Offline</h3>
              <p className="text-sm text-muted-foreground">
                Access features without internet
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Native Feel</h3>
              <p className="text-sm text-muted-foreground">
                Feels like a real app
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Auto Updates</h3>
              <p className="text-sm text-muted-foreground">
                Always up-to-date protection
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Install;
