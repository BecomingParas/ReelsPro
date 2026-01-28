"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  X
} from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
  };

  const handleClose = () => {
    setNotification(null);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-500/30 text-green-400";
      case "error":
        return "bg-gradient-to-r from-red-500/20 to-rose-600/20 border-red-500/30 text-red-400";
      case "warning":
        return "bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/30 text-yellow-400";
      case "info":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border-blue-500/30 text-blue-400";
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed top-4 right-4 z-[9999] animate-fade-in">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border ${getStyles(notification.type)} shadow-2xl max-w-md`}>
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}