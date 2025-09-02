import { createContext, useState, ReactNode } from "react";

// Notification ka type
type Notification = {
  id: number;
  name: string;
  message: string;
};

// Context ke liye type
type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), ...notification }, // auto id generate
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
