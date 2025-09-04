import {  useState } from "react";
import {  useNotificationContext } from "@/Context/NoteficationContext";

export const NotificationIcon = () => {


const {notification} = useNotificationContext () 
  const [open, setOpen] = useState(false);

  if (!notification) return null;

  return (
    <div className="relative">
      <button className="text-white" onClick={() => setOpen(!open)}>
        🔔 ({notification.length})
      </button>

      {open && (
       <div className="absolute right-0 mt-2 w-64 
                bg-white dark:bg-gray-900 
                text-black dark:text-white
                shadow-lg border border-gray-200 dark:border-gray-700 
                rounded-lg p-2">
  {notification.length === 0 ? (
    <p className="text-gray-600 dark:text-gray-400">No new notifications</p>
  ) : (
    notification.map((n) => (
      <div 
        key={n.id} 
        className="border-b border-gray-200 dark:border-gray-700 p-2 last:border-0"
      >
        <p className="font-bold text-gray-800 dark:text-gray-100">{n.name}</p>
        <p className="text-gray-600 dark:text-gray-400">{n.message}</p>
      </div>
    ))
  )}
</div>

      )}
    </div>
  );
};


