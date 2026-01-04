import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Play } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const payments = [
  { id: "IN-2024-001", fiatAmount: "€500,000", currency: "EUR", cryptoAmount: "499,500 USDT", fromBank: "Bank XYZ", reference: "TREAS-2024-04-001", initiator: "Gateway", time: "about 1 hour ago", status: "received" },
  { id: "IN-2024-002", fiatAmount: "$250,000", currency: "USD", cryptoAmount: "250,000 USDT", fromBank: "Bank ABC", reference: "HEDGE-2024-012", initiator: "Gateway", time: "about 2 hours ago", status: "processing" },
  { id: "IN-2024-003", fiatAmount: "€1,000,000", currency: "EUR", cryptoAmount: "999,000 USDT", fromBank: "Bank DEF", reference: "INST-PAY-001", initiator: "Gateway", time: "about 3 hours ago", status: "received" },
  { id: "IN-2024-004", fiatAmount: "$750,000", currency: "USD", cryptoAmount: "750,000 USDT", fromBank: "Bank GHI", reference: "MAJOR-001", initiator: "Gateway", time: "about 4 hours ago", status: "received" },
  { id: "IN-2024-005", fiatAmount: "€2,000,000", currency: "EUR", cryptoAmount: "1,998,000 USDT", fromBank: "Bank JKL", reference: "Q4-RES-001", initiator: "Gateway", time: "about 5 hours ago", status: "processing" },
];

const statusClasses: Record<string, string> = {
  received: "status-badge status-received",
  processing: "status-badge status-processing",
};

const statusLabels: Record<string, string> = {
  received: "Received",
  processing: "Processing",
};

const IncomingPayments = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Incoming Payments" 
        subtitle="Process fiat-to-crypto conversions from bank gateways" 
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
        {payments.map((payment) => (
          <div key={payment.id} className="content-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{payment.id}</p>
                <p className="text-xs text-muted-foreground">{payment.reference}</p>
              </div>
              <span className={statusClasses[payment.status]}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabels[payment.status]}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Fiat Amount</p>
                <p className="font-medium">{payment.fiatAmount}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Converted</p>
                <p className="font-medium text-accent">{payment.cryptoAmount}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">From Bank</p>
                <p className="font-medium">{payment.fromBank}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Created</p>
                <p className="font-medium">{payment.time}</p>
              </div>
            </div>
            <Button size="sm" className="w-full gap-1 bg-primary hover:bg-primary/90">
              <Play className="w-3 h-3" />
              Process
            </Button>
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
                <TableHead>Fiat Amount</TableHead>
                <TableHead>Converted</TableHead>
                <TableHead>From Bank</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.id}</p>
                      <p className="text-xs text-muted-foreground">{payment.reference}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{payment.fiatAmount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-accent font-medium">{payment.cryptoAmount}</span>
                  </TableCell>
                  <TableCell>{payment.fromBank}</TableCell>
                  <TableCell className="text-muted-foreground">{payment.reference}</TableCell>
                  <TableCell>
                    <span className={statusClasses[payment.status]}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {statusLabels[payment.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{payment.time}</TableCell>
                  <TableCell>
                    <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90">
                      <Play className="w-3 h-3" />
                      Process
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing 1-5 of 5 payments</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncomingPayments;
