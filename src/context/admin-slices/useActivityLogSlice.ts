import { useState, useCallback, useEffect } from "react";
import type { AdminActivityLog } from "@/types";
import { INITIAL_LOGS } from "../admin-seed";
import { adminApi } from "@/lib/api";

export function useActivityLogSlice() {
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(INITIAL_LOGS);

  // Sync with backend audit trail
  useEffect(() => {
    let isMounted = true;
    adminApi
      .getActivityLogs()
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res) && res.length > 0) {
          const mapped: AdminActivityLog[] = res.map((l: any) => ({
            id: String(l.id),
            adminUser: l.userName || l.user?.name || "Admin",
            action: l.action || "Store Action",
            target: l.target || "",
            timestamp: l.timestamp
              ? new Date(l.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Just now",
            details: l.details || undefined,
          }));
          setActivityLogs(mapped);
        }
      })
      .catch(() => {
        // Fallback to INITIAL_LOGS silently
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addActivityLog = useCallback((action: string, target: string, details?: string) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}`,
      adminUser: "Super Admin",
      action,
      target,
      timestamp: "Just now",
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  }, []);

  const resetActivityLogs = useCallback(() => {
    setActivityLogs(INITIAL_LOGS);
  }, []);

  return {
    activityLogs,
    setActivityLogs,
    addActivityLog,
    resetActivityLogs,
  };
}
