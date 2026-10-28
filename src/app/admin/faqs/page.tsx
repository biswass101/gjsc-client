"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronRight,
  CheckCircle2,
  Layers,
  ArrowUpDown,
  BookOpen,
} from "lucide-react";
import { useAdmin, AdminFaq } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const FAQ_CATEGORIES: AdminFaq["category"][] = [
  "Authenticity & Japan Sourcing",
  "Delivery & Shipping",
  "Payments & bKash",
  "Returns & Exchanges",
];

export default function AdminFaqsPage() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaq | null>(null);

  // Form Fields
  const [category, setCategory] = useState<AdminFaq["category"]>(FAQ_CATEGORIES[0] || "Authenticity & Japan Sourcing");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState("1");
  const [active, setActive] = useState(true);

  // Delete Alert
  const [faqToDelete, setFaqToDelete] = useState<AdminFaq | null>(null);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((faq) => {
        const matchesCategory =
          selectedCategory === "all" || faq.category === selectedCategory;

        const q = searchQuery.toLowerCase();
        const matchesSearch =
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.order - b.order);
  }, [faqs, selectedCategory, searchQuery]);

  // Statistics
  const activeCount = useMemo(
    () => faqs.filter((f) => f.active).length,
    [faqs]
  );

  const openCreateModal = () => {
    setEditingFaq(null);
    setCategory(FAQ_CATEGORIES[0] || "Authenticity & Japan Sourcing");
    setQuestion("");
    setAnswer("");
    setOrder(String(faqs.length + 1));
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: AdminFaq) => {
    setEditingFaq(faq);
    setCategory(faq.category);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(String(faq.order));
    setActive(faq.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }
    if (!answer.trim()) {
      toast.error("Please enter an answer.");
      return;
    }

    if (editingFaq) {
      updateFaq(editingFaq.id, {
        category,
        question: question.trim(),
        answer: answer.trim(),
        order: parseInt(order, 10) || 1,
        active,
      });
      toast.success("FAQ updated successfully! 🌸");
    } else {
      addFaq({
        category,
        question: question.trim(),
        answer: answer.trim(),
        order: parseInt(order, 10) || 1,
        active,
      });
      toast.success("FAQ published to customer help center! 🌸");
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!faqToDelete) return;
    deleteFaq(faqToDelete.id);
    toast.success("FAQ deleted.");
    setFaqToDelete(null);
  };

  const handleToggleActive = (faq: AdminFaq) => {
    updateFaq(faq.id, { active: !faq.active });
    toast.success(`FAQ ${!faq.active ? "activated" : "hidden"}.`);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Customer Knowledge Base</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Frequently Asked Questions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
            <HelpCircle className="h-7 w-7 text-primary" />
            <span>Storefront FAQ Management</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Empower customers with self-service answers on Tokyo direct shipments, bKash payments, product authenticity, and returns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add New FAQ</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total FAQs</span>
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {faqs.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Questions in help center
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Live on Storefront</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {activeCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Active customer visible
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Categories</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {FAQ_CATEGORIES.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Support topic pillars
          </p>
        </div>
      </div>

      {/* Toolbar: Search & Category Filter */}
      <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question or answer keywords..."
              className="pl-9 bg-background/60"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-xs shrink-0"
            >
              All ({faqs.length})
            </Button>
            {FAQ_CATEGORIES.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="text-xs shrink-0"
                >
                  {cat} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className={`rounded-xl border p-5 bg-card shadow-xs transition-all duration-200 ${
              faq.active ? "border-border/80" : "border-border/40 opacity-70"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-[10px] font-semibold">
                    {faq.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    Order #{faq.order}
                  </span>
                  {!faq.active && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      Inactive
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {faq.question}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  <Switch
                    checked={faq.active}
                    onCheckedChange={() => handleToggleActive(faq)}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(faq)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFaqToDelete(faq)}
                    className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No FAQs Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or create a helpful question-and-answer pair.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Create FAQ</span>
          </Button>
        </div>
      )}

      {/* Add / Edit FAQ Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-lg">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>{editingFaq ? "Edit FAQ Item" : "Create New FAQ"}</span>
              </DialogTitle>
              <DialogDescription>
                Help customers understand Tokyo sourcing, courier delivery timeframes, and payment options.
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
                    <p className="text-[10px] text-muted-foreground">
                      Enable to publish
                    </p>
                  </div>
                  <Switch
                    id="faq-active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                {editingFaq ? "Save FAQ" : "Publish FAQ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!faqToDelete}
        onOpenChange={(open) => !open && setFaqToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete FAQ</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ: &quot;{faqToDelete?.question}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

