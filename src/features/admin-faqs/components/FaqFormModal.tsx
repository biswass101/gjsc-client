import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminFaq } from "@/context/admin-context";
import { FAQ_CATEGORIES } from "../constants";

interface FaqFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingFaq: AdminFaq | null;
  category: AdminFaq["category"];
  setCategory: (val: AdminFaq["category"]) => void;
  question: string;
  setQuestion: (val: string) => void;
  answer: string;
  setAnswer: (val: string) => void;
  order: string;
  setOrder: (val: string) => void;
  active: boolean;
  setActive: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function FaqFormModal({
  isOpen,
  onOpenChange,
  editingFaq,
  category,
  setCategory,
  question,
  setQuestion,
  answer,
  setAnswer,
  order,
  setOrder,
  active,
  setActive,
  onSubmit,
}: FaqFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>{editingFaq ? "Edit FAQ Item" : "Create New FAQ"}</span>
            </DialogTitle>
            <DialogDescription>
              Help customers understand Tokyo sourcing, courier delivery timeframes, and payment
              options.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="faq-cat" className="text-xs font-semibold">
                Support Category
              </Label>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val as AdminFaq["category"])}
              >
                <SelectTrigger id="faq-cat">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {FAQ_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="faq-q" className="text-xs font-semibold">
                Frequently Asked Question <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="faq-q"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. How do I verify my product is genuine Japanese formula?"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="faq-a" className="text-xs font-semibold">
                Detailed Answer <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="faq-a"
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide clear, reassuring information with specific details..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="faq-order" className="text-xs font-semibold">
                  Display Order
                </Label>
                <Input
                  id="faq-order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min={1}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Label htmlFor="faq-active" className="text-xs font-semibold">
                    Visible on Site
                  </Label>
                  <p className="text-[10px] text-muted-foreground">Enable to publish</p>
                </div>
                <Switch id="faq-active" checked={active} onCheckedChange={setActive} />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {editingFaq ? "Save FAQ" : "Publish FAQ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
