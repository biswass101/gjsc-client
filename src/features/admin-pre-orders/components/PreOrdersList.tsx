import React from "react";
import { Plane, Plus } from "lucide-react";
import type { AdminPreOrder } from "@/types";
import { Button } from "@/components/ui/button";
import { PreOrderCard } from "./PreOrderCard";

interface PreOrdersListProps {
  preOrders: AdminPreOrder[];
  onEdit: (po: AdminPreOrder) => void;
  onDeleteRequest: (po: AdminPreOrder) => void;
  onStatusChange: (po: AdminPreOrder, status: AdminPreOrder["batchStatus"]) => void;
  onToggleActive: (po: AdminPreOrder) => void;
  onOpenCreate: () => void;
}

export function PreOrdersList({
  preOrders,
  onEdit,
  onDeleteRequest,
  onStatusChange,
  onToggleActive,
  onOpenCreate,
}: PreOrdersListProps) {
  if (preOrders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <Plane className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Pre-Orders Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try adjusting your search filters or launch a new Tokyo air-freight pre-order campaign.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Launch Pre-Order Campaign</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {preOrders.map((po) => (
        <PreOrderCard
          key={po.id}
          preOrder={po}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
          onStatusChange={onStatusChange}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}

