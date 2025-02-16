"use client";
import { createContext, ReactNode, useContext, useState } from "react";
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
  // Function to show notifications
  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="toast toast-bottom toast-end z-[100]">
          <div className={`alert ${getAlertClass(notification.type)}`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

// Function to get alert class based on notification type
function getAlertClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
    default:
      return "alert-info";
  }
}
// custom hook for accessing notifications
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
