import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, FileText, User, Clock } from "lucide-react";

const logs = [
  { type: "INCOMING RECEIVED", typeColor: "bg-success/10 text-success", id: "IN-2024-001", description: "Received €500,000 converted to 500,000 USDT from gateway", user: "System", time: "about 1 hour ago" },
  { type: "FEE DEDUCTED", typeColor: "bg-accent/10 text-accent", id: "IN-2024-001", description: "10% fee (50,000 USDT) deducted and sent to fee wallet", user: "System", time: "about 1 hour ago" },
  { type: "SETTLEMENT APPROVED", typeColor: "bg-info/10 text-info", id: "IN-2024-002", description: "Settlement approved by admin", user: "PI Tech Admin", time: "about 2 hours ago" },
  { type: "SETTLEMENT SENT", typeColor: "bg-success/10 text-success", id: "IN-2024-002", description: "450,000 USDT sent to bank core wallet. TxHash: 0x742d35...", user: "System", time: "about 2 hours ago" },
  { type: "TICKET CREATED", typeColor: "bg-warning/10 text-warning", id: "TK-2024-001", description: "New support ticket from Bank XYZ regarding IN-2024-001", user: "Bank XYZ", time: "about 3 hours ago" },
  { type: "TICKET REPLIED", typeColor: "bg-info/10 text-info", id: "TK-2024-001", description: "Support reply sent to Bank XYZ", user: "PI Tech Admin", time: "about 2.5 hours ago" },
  { type: "SETTLEMENT REJECTED", typeColor: "bg-destructive/10 text-destructive", id: "IN-2024-006", description: "Settlement rejected - insufficient documentation", user: "PI Tech Admin", time: "about 4 hours ago" },
  { type: "INCOMING RECEIVED", typeColor: "bg-success/10 text-success", id: "IN-2024-003", description: "Received €1,000,000 converted to 999,000 USDT from gateway", user: "System", time: "about 5 hours ago" },
];

const AuditLogs = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Audit Logs" 
        subtitle="Complete activity history for compliance" 
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
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

      {/* Logs List */}
      <div className="content-card animate-fade-in">
        <div className="divide-y divide-border">
          {logs.map((log, index) => (
            <div key={index} className="p-3 md:p-4 flex items-start gap-3 md:gap-4 hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] md:text-xs font-medium ${log.typeColor}`}>
                    {log.type}
                  </span>
                  <span className="text-muted-foreground text-xs md:text-sm">{log.id}</span>
                </div>
                <p className="text-foreground text-sm md:text-base line-clamp-2">{log.description}</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{log.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
