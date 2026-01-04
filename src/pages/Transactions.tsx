import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: "IN-2024-001", reference: "TREAS-2024-04-001", amountReceived: "500,000 USDT", feeDeducted: "50,000 USDT", amountSent: "450,000 USDT", asset: "USDT", fromBank: "Bank XYZ", status: "pending", time: "about 1 hour ago" },
  { id: "IN-2024-002", reference: "HEDGE-2024-012", amountReceived: "250,000 USDT", feeDeducted: "25,000 USDT", amountSent: "225,000 USDT", asset: "USDT", fromBank: "Bank ABC", status: "processed", time: "about 2 hours ago" },
  { id: "IN-2024-003", reference: "INST-PAY-001", amountReceived: "1,000,000 USDT", feeDeducted: "100,000 USDT", amountSent: "900,000 USDT", asset: "USDT", fromBank: "Bank DEF", status: "sent", time: "about 3 hours ago" },
  { id: "IN-2024-004", reference: "MAJOR-001", amountReceived: "750,000 USDT", feeDeducted: "75,000 USDT", amountSent: "675,000 USDT", asset: "USDT", fromBank: "Bank GHI", status: "settled", time: "about 4 hours ago" },
  { id: "IN-2024-005", reference: "Q4-RES-001", amountReceived: "2,000,000 USDT", feeDeducted: "200,000 USDT", amountSent: "1,800,000 USDT", asset: "USDT", fromBank: "Bank JKL", status: "settled", time: "about 5 hours ago" },
];

const statusClasses: Record<string, string> = {
  pending: "status-badge status-pending",
  processed: "status-badge status-approved",
  sent: "status-badge status-processing",
  settled: "status-badge status-settled",
  cancelled: "status-badge status-rejected",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processed: "Processed",
  sent: "Sent",
  settled: "Settled",
  cancelled: "Cancelled",
};

const Transactions = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Transactions" 
        subtitle="Complete settlement history and timeline" 
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, reference..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="content-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{tx.id}</p>
                <p className="text-xs text-muted-foreground">{tx.reference}</p>
              </div>
              <span className={statusClasses[tx.status]}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabels[tx.status]}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Received</p>
                <p className="font-medium">{tx.amountReceived}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Fee</p>
                <p className="font-medium text-primary">{tx.feeDeducted}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Sent</p>
                <p className="font-medium text-success">{tx.amountSent}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">From Bank</p>
                <p className="font-medium">{tx.fromBank}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{tx.time}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-accent h-auto py-1">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block content-card animate-fade-in">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID ↕</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Fee Deducted</TableHead>
                <TableHead>Amount Sent</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>From Bank</TableHead>
                <TableHead>Created ↕</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tx.id}</p>
                      <p className="text-xs text-muted-foreground">{tx.reference}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{tx.amountReceived}</TableCell>
                  <TableCell className="text-primary font-medium">{tx.feeDeducted}</TableCell>
                  <TableCell className="text-success font-medium">{tx.amountSent}</TableCell>
                  <TableCell>
                    <span className="text-accent font-medium">{tx.asset}</span>
                  </TableCell>
                  <TableCell>
                    <span className={statusClasses[tx.status]}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {statusLabels[tx.status]}
                    </span>
                  </TableCell>
                  <TableCell>{tx.fromBank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{tx.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-accent">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing 1-5 of 5 transactions</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
