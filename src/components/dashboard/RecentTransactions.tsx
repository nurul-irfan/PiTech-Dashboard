import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  fiatAmount: string;
  cryptoAmount: string;
  fromBank: string;
  status: "received" | "processing" | "settled" | "pending";
  time: string;
}

const transactions: Transaction[] = [
  { id: "IN-2024-001", fiatAmount: "€500,000", cryptoAmount: "499,500 USDT", fromBank: "Bank XYZ", status: "received", time: "about 1 hour ago" },
  { id: "IN-2024-002", fiatAmount: "$250,000", cryptoAmount: "250,000 USDT", fromBank: "Bank ABC", status: "processing", time: "about 2 hours ago" },
  { id: "IN-2024-003", fiatAmount: "€1,000,000", cryptoAmount: "999,000 USDT", fromBank: "Bank DEF", status: "settled", time: "about 3 hours ago" },
  { id: "IN-2024-004", fiatAmount: "$750,000", cryptoAmount: "750,000 USDT", fromBank: "Bank GHI", status: "pending", time: "about 4 hours ago" },
  { id: "IN-2024-005", fiatAmount: "€2,000,000", cryptoAmount: "1,998,000 USDT", fromBank: "Bank JKL", status: "settled", time: "about 5 hours ago" },
];

const statusClasses: Record<string, string> = {
  received: "status-badge status-received",
  processing: "status-badge status-processing",
  settled: "status-badge status-settled",
  pending: "status-badge status-pending",
};

const statusLabels: Record<string, string> = {
  received: "Received",
  processing: "Processing",
  settled: "Settled",
  pending: "Pending",
};

export function RecentTransactions() {
  return (
    <div className="content-card p-4 md:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold font-['Outfit']">Recent Incoming</h2>
        <Link to="/incoming" className="flex items-center gap-1 text-xs md:text-sm text-accent hover:text-accent/80 transition-colors">
          View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </Link>
      </div>

      <div className="space-y-3 md:space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="py-2 md:py-3 border-b border-border last:border-0">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{tx.id}</span>
                <span className={`${statusClasses[tx.status]} text-[10px]`}>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {statusLabels[tx.status]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{tx.fiatAmount}</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-accent font-medium">{tx.cryptoAmount}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{tx.fromBank}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{tx.time}</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{tx.id}</span>
                  <span className={statusClasses[tx.status]}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusLabels[tx.status]}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{tx.fiatAmount}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="text-accent font-medium">{tx.cryptoAmount}</span>
                  <span>• {tx.fromBank}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{tx.time}</span>
                <ArrowRight className="w-4 h-4 ml-2 text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
