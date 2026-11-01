import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatBDT } from "@/lib/catalog";

interface NagadInstructionsProps {
  grandTotal: number;
  nagadPhone: string;
  onNagadPhoneChange: (val: string) => void;
  nagadTrxId: string;
  onNagadTrxIdChange: (val: string) => void;
}

export function NagadInstructions({
  grandTotal,
  nagadPhone,
  onNagadPhoneChange,
  nagadTrxId,
  onNagadTrxIdChange,
}: NagadInstructionsProps) {
  return (
    <div className="mt-4 rounded-xl border border-[#F7941D]/30 bg-[#F7941D]/5 p-4 text-xs space-y-3">
      <div className="flex items-center gap-2 font-semibold text-[#F7941D]">
        <Sparkles className="h-4 w-4" />
        Nagad Payment Instructions
      </div>
      <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-relaxed">
        <li>
          Open your Nagad app or dial <strong>*167#</strong>.
        </li>
        <li>
          Choose <strong>Send Money</strong> to number:{" "}
          <strong className="text-foreground">01988-990022</strong>.
        </li>
        <li>
          Enter Amount: <strong className="text-foreground">{formatBDT(grandTotal)}</strong>.
        </li>
        <li>Enter your sender number and Transaction ID below:</li>
      </ol>

      <div className="grid gap-3 sm:grid-cols-2 pt-1">
        <div>
          <Label htmlFor="nagadPhone" className="text-[11px] font-semibold">
            Your Nagad Number <span className="text-rose">*</span>
          </Label>
          <Input
            id="nagadPhone"
            required
            value={nagadPhone}
            onChange={(e) => onNagadPhoneChange(e.target.value)}
            placeholder="019XXXXXXXX"
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
        <div>
          <Label htmlFor="nagadTrx" className="text-[11px] font-semibold">
            Nagad Transaction ID <span className="text-rose">*</span>
          </Label>
          <Input
            id="nagadTrx"
            required
            value={nagadTrxId}
            onChange={(e) => onNagadTrxIdChange(e.target.value.toUpperCase())}
            placeholder="e.g. 7X38AD2F"
            className="mt-1 h-9 rounded-full text-xs uppercase"
          />
        </div>
      </div>
    </div>
  );
}

