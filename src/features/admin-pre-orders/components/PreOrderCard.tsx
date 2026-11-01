import React from "react";
import { Edit2, Trash2, Calendar } from "lucide-react";
import type { AdminPreOrder } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BATCH_STATUSES, DEFAULT_PREORDER_IMAGES } from "../constants";

interface PreOrderCardProps {
  preOrder: AdminPreOrder;
  onEdit: (po: AdminPreOrder) => void;
  onDeleteRequest: (po: AdminPreOrder) => void;
  onStatusChange: (po: AdminPreOrder, status: AdminPreOrder["batchStatus"]) => void;
  onToggleActive: (po: AdminPreOrder) => void;
}

export function PreOrderCard({
  preOrder: po,
  onEdit,
  onDeleteRequest,
  onStatusChange,
  onToggleActive,
}: PreOrderCardProps) {
  const bookedPercent = Math.min(100, Math.round((po.slotsBooked / po.slotsTotal) * 100));
  const currentBatchConfig =
    BATCH_STATUSES.find((b) => b.status === po.batchStatus) || BATCH_STATUSES[0];
  const depositAmount = (po.price * (po.depositPercent / 100)).toFixed(0);

  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Product info with thumbnail */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative h-20 w-20 rounded-xl border border-border/80 overflow-hidden bg-muted shrink-0 shadow-2xs">
            <img
              src={po.image}
              alt={po.productName}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_PREORDER_IMAGES[0] || "";
              }}
            />
            {!po.active && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Paused
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[10px] font-bold">
                {po.brand}
              </Badge>
              {po.japaneseName && (
                <span className="font-mono text-xs text-muted-foreground font-semibold">
                  {po.japaneseName}
                </span>
              )}
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                {po.category}
              </Badge>
            </div>

            <h3 className="text-base font-bold text-foreground">{po.productName}</h3>

            {po.notes && (
              <p className="text-xs text-muted-foreground line-clamp-1 italic">{po.notes}</p>
            )}

            <div className="flex items-center gap-4 text-xs pt-1">
              <span className="font-bold text-foreground text-sm">
                ৳{po.price.toLocaleString("en-BD")}
              </span>
              <span className="text-muted-foreground">
                Required Deposit:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {po.depositPercent}% (৳{depositAmount})
                </strong>
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                ETA: <strong>{po.estimatedArrival}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Quota reservation progress */}
        <div className="w-full lg:w-64 space-y-2 p-3 rounded-lg bg-secondary/30 border border-border/60">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Quota Reserved</span>
            <span className="font-bold text-foreground">
              {po.slotsBooked} / {po.slotsTotal} slots ({bookedPercent}%)
            </span>
          </div>
          <Progress value={bookedPercent} className="h-2" />
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{po.slotsTotal - po.slotsBooked} slots remaining</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              ৳{(parseFloat(depositAmount) * po.slotsBooked).toLocaleString("en-BD")} collected
            </span>
          </div>
        </div>

        {/* Batch status dropdown & actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Batch Stage
            </span>
            <Select
              value={po.batchStatus}
              onValueChange={(val) => onStatusChange(po, val as AdminPreOrder["batchStatus"])}
            >
              <SelectTrigger className={`h-8 text-xs font-semibold ${currentBatchConfig?.bgColor}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BATCH_STATUSES.map((b) => (
                  <SelectItem key={b.status} value={b.status} className="text-xs">
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Booking</span>
              <Switch
                checked={po.active}
                onCheckedChange={() => onToggleActive(po)}
                title={po.active ? "Pause Pre-Orders" : "Open Pre-Orders"}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(po)}
              className="h-8 gap-1.5 text-xs"
            >
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Edit</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteRequest(po)}
              className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
