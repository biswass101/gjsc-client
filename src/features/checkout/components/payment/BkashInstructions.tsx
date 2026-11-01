import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatBDT } from "@/lib/catalog";

interface BkashInstructionsProps {
  grandTotal: number;
  bkashPhone: string;
  onBkashPhoneChange: (val: string) => void;
  bkashTrxId: string;
  onBkashTrxIdChange: (val: string) => void;
}

export function BkashInstructions({
  grandTotal,
  bkashPhone,
  onBkashPhoneChange,
  bkashTrxId,
  onBkashTrxIdChange,
}: BkashInstructionsProps) {
  return (
    <div className="mt-4 rounded-xl border border-[#E2136E]/30 bg-[#E2136E]/5 p-4 text-xs space-y-3">
      <div className="flex items-center gap-2 font-semibold text-[#E2136E]">
        <Sparkles className="h-4 w-4" />
        bKash Payment Instructions
      </div>
      <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-relaxed">
        <li>
          Open your bKash app or dial <strong>*247#</strong>.
        </li>
        <li>
          Choose <strong>Send Money</strong> to Merchant/Personal number:{" "}
          <strong className="text-foreground">01788-990011</strong>.
        </li>
        <li>
          Enter Amount: <strong className="text-foreground">{formatBDT(grandTotal)}</strong>.
        </li>
        <li>
          Reference: <strong>GLORIOUS</strong>.
        </li>
        <li>Enter your sender number and Transaction ID (TrxID) below:</li>
      </ol>

      <div className="grid gap-3 sm:grid-cols-2 pt-1">
        <div>
          <Label htmlFor="bkashPhone" className="text-[11px] font-semibold">
            Your bKash Number <span className="text-rose">*</span>
          </Label>
          <Input
            id="bkashPhone"
            required
            value={bkashPhone}
            onChange={(e) => onBkashPhoneChange(e.target.value)}
            placeholder="017XXXXXXXX"
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
        <div>
          <Label htmlFor="bkashTrx" className="text-[11px] font-semibold">
            Transaction ID (TrxID) <span className="text-rose">*</span>
          </Label>
          <Input
            id="bkashTrx"
            required
            value={bkashTrxId}
            onChange={(e) => onBkashTrxIdChange(e.target.value.toUpperCase())}
            placeholder="e.g. BL9A8BC71D"
            className="mt-1 h-9 rounded-full text-xs uppercase"
          />
        </div>
      </div>
    </div>
  );
}

