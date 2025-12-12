import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
}

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      toast({ title: "Not Supported", description: "Push notifications are not supported.", variant: "destructive" });
      return false;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        toast({ title: "Notifications Enabled", description: "You'll receive real-time threat alerts." });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(async (payload: NotificationPayload): Promise<boolean> => {
    if (permission !== 'granted') return false;
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(payload.title, {
          body: payload.body,
          icon: payload.icon || '/pwa-192x192.png',
          tag: payload.tag || 'safelaylar-notification',
          data: payload.data,
        });
        return true;
      }
      new Notification(payload.title, { body: payload.body, icon: payload.icon || '/pwa-192x192.png' });
      return true;
    } catch {
      return false;
    }
  }, [permission]);

  const sendThreatAlert = useCallback(async (threatType: string, severity: 'low' | 'medium' | 'high' | 'critical', details: string) => {
    const emoji: Record<string, string> = { low: '⚠️', medium: '🟡', high: '🟠', critical: '🔴' };
    return sendNotification({ title: `${emoji[severity]} ${threatType} Detected`, body: details, tag: `threat-${Date.now()}`, data: { threatType, severity, details } });
  }, [sendNotification]);

  return { permission, isSupported, subscription, requestPermission, sendNotification, sendThreatAlert, isEnabled: permission === 'granted' };
};
