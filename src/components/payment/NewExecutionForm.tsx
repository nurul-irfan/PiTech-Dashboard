"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  AlertCircle,
  Info,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CORE_WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f7BBBB";

type Props = {
  onSuccess: (data: {
    fiatAmount: string;
  }) => void;
};

export const NewExecutionForm = ({ onSuccess }: Props) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fiatAmount: "",
    fiatCurrency: "EUR",
    binanceAccountRef: "",
    notes: "",
  });

  const estimatedUsdt = useMemo(() => {
    const amount = Number(formData.fiatAmount);
    if (!amount || amount <= 0) return 0;
    return amount * (formData.fiatCurrency === "EUR" ? 1.08 : 1);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fiatAmount || !formData.binanceAccountRef) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Execution Request Created",
      description: "Submitted for approval",
    });

    onSuccess({ fiatAmount: formData.fiatAmount });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[100dvh] w-full max-w-full"
    >
      {/* Info Header */}
      <div className="bg-info/10 border-b px-4 py-4 sm:px-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-info mt-1 shrink-0" />
          <div>
            <p className="text-sm font-medium text-info">
              Dual Approval Required
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Multi-level approval needed before execution.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:p-6 space-y-6">
          {/* Amount */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
              <DollarSign className="w-5 h-5 text-primary" />
              Amount Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Fiat Amount *</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={formData.fiatAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, fiatAmount: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Currency *</Label>
                <Select
                  value={formData.fiatCurrency}
                  onValueChange={(v) =>
                    setFormData({ ...formData, fiatCurrency: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="AED">AED</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl border">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Estimated Output
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary">
                {estimatedUsdt.toLocaleString()} USDT
              </p>
            </div>
          </div>

          {/* Account */}
          {/* <div className="space-y-2">
            <Label>Binance Account Reference *</Label>
            <Input
              value={formData.binanceAccountRef}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  binanceAccountRef: e.target.value,
                })
              }
            />

            <div className="bg-muted/50 p-3 rounded-lg border break-all">
              <code className="text-xs sm:text-sm">{CORE_WALLET}</code>
              <p className="text-xs text-muted-foreground mt-1 flex gap-1 items-center">
                <AlertCircle className="w-3 h-3" />
                Read-only audited wallet
              </p>
            </div>
          </div> */}

          {/* Notes */}
          <div>
            <Label>Notes</Label>
            <Textarea
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-background border-t px-4 py-4 sm:px-6">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto sm:ml-auto bg-yellow-500 hover:bg-yellow-600 text-black flex items-center justify-center"
          >
            Submit for Approval
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
