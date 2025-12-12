import { useState, useEffect } from "react";
import { Bell, BellOff, BellRing, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { motion, AnimatePresence } from "framer-motion";

const NotificationSetup = () => {
  const { permission, isSupported, requestPermission, sendThreatAlert, isEnabled } = usePushNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    await requestPermission();
    setIsLoading(false);
  };

  const handleTestNotification = async () => {
    await sendThreatAlert(
      'Test Alert',
      'medium',
      'This is a test notification from SafeLaylar. Your protection is active!'
    );
  };

  if (!isSupported) {
    return (
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <BellOff className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium text-foreground">Notifications Not Supported</p>
              <p className="text-sm text-muted-foreground">
                Your browser doesn't support push notifications. Try using Chrome, Firefox, or Edge.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BellRing className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Threat Notifications</CardTitle>
            <CardDescription>Get real-time alerts when threats are detected</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div
              key="enabled"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl border border-success/20">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium text-success">Notifications Enabled</p>
                    <p className="text-sm text-muted-foreground">You'll receive threat alerts instantly</p>
                  </div>
                </div>
                <Switch checked disabled />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm">Critical threats</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-warning" />
                    <span className="text-sm">High-risk content</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Weekly reports</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleTestNotification} className="w-full">
                <Bell className="w-4 h-4 mr-2" />
                Send Test Notification
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="disabled"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="text-center py-4">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground mb-4">
                  Enable notifications to receive real-time alerts when SafeLaylar detects threats.
                </p>
                <Button onClick={handleEnableNotifications} disabled={isLoading}>
                  {isLoading ? (
                    "Requesting..."
                  ) : (
                    <>
                      <Bell className="w-4 h-4 mr-2" />
                      Enable Notifications
                    </>
                  )}
                </Button>
              </div>

              {permission === 'denied' && (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-destructive">
                    Notifications are blocked. Please enable them in your browser settings.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default NotificationSetup;
