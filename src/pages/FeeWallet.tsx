import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink, ArrowDownLeft, TrendingUp, Globe, Shield, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const feeHistory = [
  { id: "FEE-001", txId: "IN-2024-001", amount: "50,000 USDT", time: "about 1 hour ago" },
  { id: "FEE-002", txId: "IN-2024-002", amount: "25,000 USDT", time: "about 2 hours ago" },
  { id: "FEE-003", txId: "IN-2024-003", amount: "100,000 USDT", time: "about 3 hours ago" },
  { id: "FEE-004", txId: "IN-2024-004", amount: "75,000 USDT", time: "about 4 hours ago" },
  { id: "FEE-005", txId: "IN-2024-005", amount: "200,000 USDT", time: "about 5 hours ago" },
];

const FeeWallet = () => {
  const { toast } = useToast();
  const walletAddress = "0xABC123def456789GHI012345jkl678MNO90pqrst";

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <DashboardLayout>
      <Header 
        title="Fee Wallet" 
        subtitle="PI Tech fee collection overview" 
      />

      {/* Wallet Card */}
      <div className="bg-gradient-primary rounded-2xl p-6 md:p-8 mb-6 lg:mb-8 relative overflow-hidden animate-fade-in">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 opacity-10">
          <div className="w-full h-full border-4 md:border-8 border-primary-foreground rounded-full" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground font-['Outfit']">PI Tech Fee Wallet</h2>
              <p className="text-primary-foreground/70 text-sm">ETH / EVM Compatible</p>
            </div>
          </div>

          <div className="bg-primary-foreground/10 rounded-xl p-3 md:p-4 mb-4">
            <p className="text-primary-foreground/60 text-xs md:text-sm mb-2">Wallet Address</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="font-mono text-primary-foreground text-sm md:text-lg break-all">{walletAddress}</p>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={copyAddress}
                >
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary-foreground/70 text-xs md:text-sm">
            <Shield className="w-4 h-4" />
            <span>Audited & immutable fee collection address</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 lg:mb-8">
        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 md:w-6 md:h-6 text-success" />
            </div>
            <span className="text-muted-foreground text-sm">Total Fees Received</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-['Outfit']">750,000</p>
          <p className="text-muted-foreground text-sm">USDT</p>
        </div>

        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            </div>
            <span className="text-muted-foreground text-sm">Fee Collections</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-['Outfit']">15</p>
          <p className="text-muted-foreground text-sm">Completed</p>
        </div>

        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-info/10 flex items-center justify-center">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-info" />
            </div>
            <span className="text-muted-foreground text-sm">Network</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-['Outfit']">ETH</p>
          <p className="text-muted-foreground text-sm">Ethereum Mainnet</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="content-card p-4 md:p-6 mb-6 lg:mb-8 animate-fade-in">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Security Notice</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              This fee wallet collects 10% fees automatically from all processed settlements. 
              The wallet address is audited and immutable. All USDT fees from approved settlements 
              are directed here automatically. The wallet address cannot be modified through the 
              platform interface. Any address changes require a formal security review process.
            </p>
          </div>
        </div>
      </div>

      {/* Fee History - Mobile */}
      <div className="block lg:hidden space-y-3">
        <h3 className="font-semibold mb-3">Fee Collection History</h3>
        {feeHistory.map((fee) => (
          <div key={fee.id} className="content-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{fee.id}</span>
              <span className="font-medium text-success">{fee.amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="text-accent">{fee.txId}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{fee.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fee History - Desktop */}
      <div className="hidden lg:block content-card animate-fade-in">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">Fee Collection History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee ID</TableHead>
              <TableHead>Related Transaction</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeHistory.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.id}</TableCell>
                <TableCell className="text-accent">{fee.txId}</TableCell>
                <TableCell className="font-medium text-success">{fee.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{fee.time}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default FeeWallet;
