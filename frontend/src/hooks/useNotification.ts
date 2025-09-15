import { useState, useCallback, useEffect } from 'react';

type NotificationType = 'success' | 'error';

interface Notification {
  type: NotificationType;
  message: string;
}

export const useNotification = (autoHideDelay = 5000) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    setNotification({ type, message });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Auto-hide notification
  useEffect(() => {
    if (!notification) return;
    
    const timer = setTimeout(() => hideNotification(), autoHideDelay);
    return () => clearTimeout(timer);
  }, [notification, hideNotification, autoHideDelay]);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
