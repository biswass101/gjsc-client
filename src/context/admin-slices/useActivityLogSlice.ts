import { useState, useCallback } from "react";
import type { AdminActivityLog } from "@/types";
import { INITIAL_LOGS } from "../admin-seed";

export function useActivityLogSlice() {
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(INITIAL_LOGS);

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

