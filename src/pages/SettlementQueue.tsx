import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Clock, Check, X, User, Eye, DollarSign, Wallet, FileText } from "lucide-react";

const pendingSettlements = [
  {
    id: "IN-2024-001",
    fromBank: "Bank XYZ",
    initiator: "Gateway System",
    amountReceived: "500,000 USDT",
    fee: "50,000 USDT",
    toSend: "450,000 USDT",
    targetWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f7BBB",
    reference: "TREAS-2024-04-001",
    notes: "Treasury allocation for Q4 reserves",
    time: "about 1 hour ago",
  },
  {
    id: "IN-2024-002",
    fromBank: "Bank ABC",
    initiator: "Gateway System",
    amountReceived: "250,000 USDT",
    fee: "25,000 USDT",
    toSend: "225,000 USDT",
    targetWallet: "0x892d45Dd7745D1643016b955Cc8e8706f8AAA",
    reference: "HEDGE-2024-012",
    notes: "Hedging position for forex exposure",
    time: "about 2 hours ago",
  },
  {
    id: "IN-2024-003",
    fromBank: "Bank DEF",
    initiator: "Gateway System",
    amountReceived: "999,000 USDT",
    fee: "99,900 USDT",
    toSend: "899,100 USDT",
    targetWallet: "0x553c22Bb5523B0421904a644Aa7d6684e5CCC",
    reference: "INST-PAY-001",
    notes: "Institutional payment processing",
    time: "about 3 hours ago",
  },
];

const SettlementQueue = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Settlement Queue" 
        subtitle="Review and approve pending fee deductions and settlements" 
      />

      {/* Alert Banner */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-4 mb-6 lg:mb-8 animate-fade-in">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-base">{pendingSettlements.length} Pending Settlements</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Each request requires dual approval before execution</p>
        </div>
      </div>

      {/* Settlement Cards */}
      <div className="space-y-4 lg:space-y-6">
        {pendingSettlements.map((settlement) => (
          <div key={settlement.id} className="content-card p-4 md:p-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-bold font-['Outfit']">{settlement.id}</span>
                <span className="status-badge status-pending">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Pending
                </span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground self-start sm:self-center">
                <Eye className="w-4 h-4" />
                Details
              </Button>
            </div>

            {/* Initiator Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{settlement.initiator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{settlement.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">From: {settlement.fromBank}</span>
              </div>
            </div>

            {/* Amount Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-muted rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1 md:mb-2">
                  <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                  Received
                </div>
                <p className="text-base md:text-xl font-bold text-accent">{settlement.amountReceived}</p>
              </div>
              <div className="bg-muted rounded-lg p-3 md:p-4">
                <div className="text-muted-foreground text-xs mb-1 md:mb-2">
                  Fee (10%)
                </div>
                <p className="text-base md:text-xl font-bold text-primary">{settlement.fee}</p>
              </div>
              <div className="bg-muted rounded-lg p-3 md:p-4">
                <div className="text-muted-foreground text-xs mb-1 md:mb-2">
                  To Send (90%)
                </div>
                <p className="text-base md:text-xl font-bold text-success">{settlement.toSend}</p>
              </div>
              <div className="bg-muted rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1 md:mb-2">
                  <FileText className="w-3 h-3 md:w-4 md:h-4" />
                  Reference
                </div>
                <p className="text-xs md:text-sm font-medium truncate">{settlement.reference}</p>
              </div>
            </div>

            {/* Target Wallet */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1 md:mb-2">
                <Wallet className="w-3 h-3 md:w-4 md:h-4" />
                Target Wallet (Bank's Core)
              </div>
              <p className="font-mono text-xs md:text-sm break-all">{settlement.targetWallet}</p>
            </div>

            {/* Notes */}
            <div className="bg-info/5 border-l-4 border-info rounded-r-lg p-3 md:p-4 mb-4 md:mb-6">
              <p className="text-xs md:text-sm text-info font-medium mb-1">Notes from Gateway</p>
              <p className="text-xs md:text-sm text-muted-foreground">{settlement.notes}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button className="flex-1 btn-approve gap-2">
                <Check className="w-4 h-4" />
                Approve Request
              </Button>
              <Button variant="outline" className="flex-1 btn-reject gap-2">
                <X className="w-4 h-4" />
                Reject Request
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SettlementQueue;
