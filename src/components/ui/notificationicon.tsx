import { useState, useMemo } from "react";
import { useNotificationContext } from "@/context/notificationcontext/NoteficationContext";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

type FilterType = "notifications" | "read" | "unread";

export const NotificationIcon = () => {
  const { notification, markAsRead } = useNotificationContext();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("notifications");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const isNotificationVisible = pathname === "/";
  if (!notification) return null;

  const totalCount = notification.length;
  const readCount = notification.filter((n) => n.read).length;
  const unreadCount = totalCount - readCount;

  const filteredNotifications = useMemo(() => {
    if (filter === "read") return notification.filter((n) => n.read);
    if (filter === "unread") return notification.filter((n) => !n.read);
    return notification;
  }, [filter, notification]);

  const toggleExpand = (id: number, isRead: boolean) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        if (!isRead) {
          markAsRead(id);
        }
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="rounded-full relative">
      {isNotificationVisible && (
        <Button
          isIconOnly
          className="backdrop-blur-sm rounded-full bg-transparent text-white"
          variant="light"
          onPress={() => {
            setOpen(true);
            setFilter("notifications");
          }}
        >
          <span className="relative">
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 z-20" />
            )}
          </span>
        </Button>
      )}

      <Drawer isOpen={open} onOpenChange={setOpen} placement="right" size="sm">
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    className={`px-3 py-1 rounded-lg ${
                      filter === "notifications"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setFilter("notifications")}
                  >
                    Notifications ({totalCount})
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg ${
                      filter === "read"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setFilter("read")}
                  >
                    Read
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg ${
                      filter === "unread"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setFilter("unread")}
                  >
                    Unread 
                  </button>
                </div>
              </DrawerHeader>

              <DrawerBody className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    No notifications found
                  </p>
                ) : (
                  filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg border cursor-pointer transition ${
                        n.read
                          ? "bg-gray-100 border-gray-300"
                          : "bg-blue-50 border-blue-400"
                      }`}
                      onClick={() => toggleExpand(n.id, n.read)}
                    >
                      <p className="font-bold text-gray-800 dark:text-gray-100">
                        {n.name}
                      </p>
                      {expandedIds.includes(n.id) && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {n.message}
                        </p>
                      )}
                      {!n.read && !expandedIds.includes(n.id) && (
                        <span className="text-xs text-blue-600">Unread</span>
                      )}
                    </div>
                  ))
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
