import { Clock, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PendingItem {
  id: string;
  fromBank: string;
  initiator: string;
  amount: string;
  fee: string;
  toSend: string;
  time: string;
  notes: string;
}

const pendingItems: PendingItem[] = [
  {
    id: "IN-2024-001",
    fromBank: "Bank XYZ",
    initiator: "Gateway System",
    amount: "€500,000",
    fee: "50,000 USDT",
    toSend: "450,000 USDT",
    time: "about 1 hour ago",
    notes: "Treasury allocation for Q4 reserves",
  },
];

export function PendingSettlements() {
  return (
    <div className="content-card p-4 md:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base font-['Outfit']">Pending Settlements</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{pendingItems.length} awaiting</p>
          </div>
        </div>
        <Link to="/settlements" className="text-xs md:text-sm text-accent hover:text-accent/80 flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {pendingItems.map((item) => (
        <div key={item.id} className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm md:text-base">{item.id}</span>
            <span className="status-badge status-pending text-[10px] md:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Pending
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span>{item.initiator}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span>{item.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-base md:text-lg font-semibold">{item.amount}</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-accent font-medium">USDT</span>
          </div>

          <div className="bg-muted rounded-lg p-2 md:p-3 text-xs md:text-sm text-muted-foreground">
            {item.notes}
          </div>

          <div className="flex gap-2 md:gap-3">
            <Button size="sm" className="flex-1 btn-approve gap-1 md:gap-2 text-xs md:text-sm">
              <Check className="w-3 h-3 md:w-4 md:h-4" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="flex-1 btn-reject gap-1 md:gap-2 text-xs md:text-sm">
              <X className="w-3 h-3 md:w-4 md:h-4" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
