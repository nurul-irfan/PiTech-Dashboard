import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Download, MessageSquare, Clock, Send, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const tickets = [
  { id: "TK-2024-001", fromBank: "Bank XYZ", issue: "Discrepancy in IN-2024-001 amount", status: "open", created: "about 1 hour ago", lastReply: "about 30 min ago" },
  { id: "TK-2024-002", fromBank: "Bank ABC", issue: "Settlement delay for IN-2024-002", status: "in_progress", created: "about 3 hours ago", lastReply: "about 1 hour ago" },
  { id: "TK-2024-003", fromBank: "Bank DEF", issue: "Request for transaction breakdown", status: "resolved", created: "about 1 day ago", lastReply: "about 5 hours ago" },
  { id: "TK-2024-004", fromBank: "Bank GHI", issue: "Wallet address verification needed", status: "open", created: "about 2 hours ago", lastReply: "Awaiting reply" },
  { id: "TK-2024-005", fromBank: "Bank JKL", issue: "Fee calculation inquiry", status: "resolved", created: "about 2 days ago", lastReply: "about 1 day ago" },
];

const statusClasses: Record<string, string> = {
  open: "status-badge status-pending",
  in_progress: "status-badge status-processing",
  resolved: "status-badge status-settled",
};

const statusLabels: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (replyText.trim()) {
      setReplyText("");
      setSelectedTicket(null);
    }
  };

  return (
    <DashboardLayout>
      <Header 
        title="Ticket System" 
        subtitle="Manage support queries from bank partners" 
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Ticket ID, bank..."
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="content-card p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-warning" />
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold font-['Outfit']">2</p>
            <p className="text-xs md:text-sm text-muted-foreground">Open</p>
          </div>
        </div>
        <div className="content-card p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-info" />
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold font-['Outfit']">1</p>
            <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
          </div>
        </div>
        <div className="content-card p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-success" />
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold font-['Outfit']">2</p>
            <p className="text-xs md:text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-3">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="content-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{ticket.id}</p>
                <p className="text-xs text-muted-foreground">{ticket.fromBank}</p>
              </div>
              <span className={statusClasses[ticket.status]}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabels[ticket.status]}
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">{ticket.issue}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{ticket.created}</span>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 h-auto py-1"
                onClick={() => setSelectedTicket(ticket)}
              >
                <MessageSquare className="w-3 h-3" />
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block content-card animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>From Bank</TableHead>
              <TableHead>Issue Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Reply</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.fromBank}</TableCell>
                <TableCell className="max-w-xs truncate">{ticket.issue}</TableCell>
                <TableCell>
                  <span className={statusClasses[ticket.status]}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusLabels[ticket.status]}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{ticket.created}</TableCell>
                <TableCell className="text-muted-foreground">{ticket.lastReply}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <MessageSquare className="w-3 h-3" />
                    View/Reply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing 1-5 of 5 tickets</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>{selectedTicket?.id} - {selectedTicket?.fromBank}</span>
              <span className={selectedTicket ? statusClasses[selectedTicket.status] : ""}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {selectedTicket ? statusLabels[selectedTicket.status] : ""}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Issue */}
            <div className="bg-muted rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Issue Description</p>
              <p className="font-medium text-sm md:text-base">{selectedTicket?.issue}</p>
            </div>

            {/* Conversation History */}
            <div className="border border-border rounded-lg p-3 md:p-4 max-h-48 md:max-h-64 overflow-auto space-y-3 md:space-y-4">
              <div className="bg-info/5 border border-info/10 rounded-lg p-3">
                <p className="text-xs text-info mb-1">Bank XYZ - {selectedTicket?.created}</p>
                <p className="text-xs md:text-sm">We noticed a discrepancy in the settlement amount for transaction IN-2024-001. The expected amount was 500,000 USDT but we received 450,000 USDT. Please clarify.</p>
              </div>
              
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 ml-4 md:ml-8">
                <p className="text-xs text-primary mb-1">PI Tech Support - about 30 min ago</p>
                <p className="text-xs md:text-sm">Thank you for reaching out. The 10% fee (50,000 USDT) was deducted as per our agreement. The 450,000 USDT sent represents the 90% settlement amount.</p>
              </div>
            </div>

            {/* Reply Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={3}
              />
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedTicket(null)} className="order-2 sm:order-1">
                  <X className="w-4 h-4 mr-1" />
                  Close
                </Button>
                <Button className="bg-primary hover:bg-primary/90 order-1 sm:order-2" onClick={handleSendReply}>
                  <Send className="w-4 h-4 mr-1" />
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Tickets;
