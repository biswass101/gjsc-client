import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AdminCustomer } from "@/types";
import { Button } from "@/components/ui/button";
import { CustomerTableRow } from "./CustomerTableRow";

interface CustomersTableProps {
  customers: AdminCustomer[];
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onSelectCustomer: (customer: AdminCustomer) => void;
}

export function CustomersTable({
  customers,
  totalFilteredCount,
  currentPage,
  totalPages,
  onPageChange,
  onSelectCustomer,
}: CustomersTableProps) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Skin Profile</th>
              <th className="py-3 px-4 text-center">Orders</th>
              <th className="py-3 px-4 text-right">Lifetime Spend (BDT)</th>
              <th className="py-3 px-4 text-center">VIP Tier</th>
              <th className="py-3 px-4 text-right">Quick Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  No customers found matching the search criteria.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <CustomerTableRow key={cust.id} customer={cust} onSelect={onSelectCustomer} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/70 p-4 text-xs text-muted-foreground">
        <span>
          Showing {customers.length} of {totalFilteredCount} filtered customers
        </span>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="h-7 w-7 p-0 rounded-md"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          <span className="px-2 font-medium text-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="h-7 w-7 p-0 rounded-md"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
