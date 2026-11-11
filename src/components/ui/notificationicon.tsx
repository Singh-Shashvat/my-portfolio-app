import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

import { useNotificationContext } from "@/context/notificationcontext/NoteficationContext";

type FilterType = "notifications" | "read" | "unread";

export const NotificationIcon = () => {
  const { notification, markAsRead } = useNotificationContext();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("notifications");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const filteredNotifications = useMemo(() => {
    if (!notification) return [];
    if (filter === "read") return notification.filter((n) => n.read);
    if (filter === "unread") return notification.filter((n) => !n.read);

    return notification;
  }, [filter, notification]);

  if (pathname !== "/" || !notification) return null;

  const totalCount = notification.length;
  const readCount = notification.filter((n) => n.read).length;
  const unreadCount = totalCount - readCount;

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
      <Button
        isIconOnly
        aria-label="Open notifications"
        className="backdrop-blur-sm rounded-full bg-transparent text-white hover:bg-neutral-800/60 min-h-[44px] min-w-[44px]"
        variant="light"
        onPress={() => {
          setOpen(true);
          setFilter("notifications");
        }}
      >
        <span className="relative text-xl">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 z-20 shadow-sm shadow-red-500/50" />
          )}
        </span>
      </Button>

      <Drawer isOpen={open} placement="right" size="sm" onOpenChange={setOpen}>
        <DrawerContent className="bg-neutral-950 border-l border-neutral-800 text-white">
          {() => (
            <>
              <DrawerHeader className="flex justify-between items-center border-b border-neutral-800/80 pb-4">
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      filter === "notifications"
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-300 hover:text-white"
                    }`}
                    onClick={() => setFilter("notifications")}
                  >
                    Notifications ({totalCount})
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      filter === "read"
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-300 hover:text-white"
                    }`}
                    onClick={() => setFilter("read")}
                  >
                    Read ({readCount})
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      filter === "unread"
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-300 hover:text-white"
                    }`}
                    onClick={() => setFilter("unread")}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>
              </DrawerHeader>

              <DrawerBody className="space-y-3 pt-4">
                {filteredNotifications.length === 0 ? (
                  <p className="text-neutral-400 text-sm text-center py-8">
                    No notifications found
                  </p>
                ) : (
                  filteredNotifications.map((n) => (
                    <button
                      key={n.id}
                      aria-expanded={expandedIds.includes(n.id)}
                      className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition ${
                        n.read
                          ? "bg-neutral-900/60 border-neutral-800 text-neutral-300"
                          : "bg-blue-950/30 border-blue-600/50 text-white"
                      }`}
                      type="button"
                      onClick={() => toggleExpand(n.id, n.read)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm text-white">
                          {n.name}
                        </p>
                        {!n.read && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            New
                          </span>
                        )}
                      </div>
                      {expandedIds.includes(n.id) ? (
                        <p className="text-neutral-300 text-xs leading-relaxed mt-1">
                          {n.message}
                        </p>
                      ) : (
                        <p className="text-neutral-400 text-xs truncate mt-1">
                          {n.message}
                        </p>
                      )}
                    </button>
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
