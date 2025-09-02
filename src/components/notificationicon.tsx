import {  useState } from "react";
import {  useNotificationContext } from "@/Context/NoteficationContext";

export const NotificationIcon = () => {
//   const notificationCtx = useContext(NoteficationContext);

const {notifications} = useNotificationContext () 
  const [open, setOpen] = useState(false);

  if (!notifications) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        🔔 ({notifications.length})
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black shadow border rounded p-2">
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((n) => (
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


