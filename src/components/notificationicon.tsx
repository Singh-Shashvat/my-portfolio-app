import {  useState } from "react";
import {  useNotificationContext } from "@/Context/NoteficationContext";

export const NotificationIcon = () => {


const {notification} = useNotificationContext () 
  const [open, setOpen] = useState(false);

  if (!notification) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        🔔 ({notification.length})
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black shadow border rounded p-2">
          {notification.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notification.map((n) => (
              <div key={n.id} className="border-b p-2">
                <p className="font-bold">{n.name}</p>
                <p>{n.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


