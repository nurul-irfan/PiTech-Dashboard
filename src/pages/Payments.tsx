"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Filter, Download, Play, Check, X, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewExecutionForm } from "@/components/payment/NewExecutionForm";


/* ---------------- MOCK DATA ---------------- */

const initialPayments = [
  { id: "IN-2024-001", amount: "500,000.00", status: "PENDING", requested_by: "Gateway" },
  { id: "IN-2024-002", amount: "250,000.00", status: "APPROVED", requested_by: "Gateway" },
  { id: "IN-2024-003", amount: "1,000,000.00", status: "REJECTED", requested_by: "Gateway" },
  { id: "IN-2024-004", amount: "750,000.00", status: "PENDING", requested_by: "Gateway" },
  { id: "IN-2024-005", amount: "2,000,000.00", status: "CANCELLED", requested_by: "Gateway" },
];

const statusClasses = {
  PENDING: "status-badge status-pending",
  APPROVED: "status-badge status-approved",
  REJECTED: "status-badge status-rejected",
  CANCELLED: "status-badge status-cancelled",
};

const statusLabels = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

const statusIcons = {
  PENDING: <Clock className="w-3 h-3" />,
  APPROVED: <Check className="w-3 h-3" />,
  REJECTED: <X className="w-3 h-3" />,
  CANCELLED: <X className="w-3 h-3" />,
};

/* ---------------- COMPONENT ---------------- */

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [openCreate, setOpenCreate] = useState(false);


  const openDetails = (payment: any) => {
    setSelected(payment);
    setOpen(true);
  };

  const updateStatus = (status: "APPROVED" | "REJECTED") => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === selected.id ? { ...p, status } : p
      )
    );
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <Header
        title="Incoming Payments"
        subtitle="Process fiat-to-crypto conversion requests"
      />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by ID, remarks..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setOpenCreate(true)}
        >
          <Download className="w-4 h-4" />
          Create Payment Request
        </Button>

      </div>

      {/* MOBILE VIEW */}
      <div className="block lg:hidden space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="content-card p-4 space-y-3">
            <span className={statusClasses[p.status]}>
              {statusIcons[p.status]}
              {statusLabels[p.status]}
            </span>

            <div className="text-sm">
              <p className="text-muted-foreground text-xs">Requested By</p>
              <p className="font-medium">{p.requested_by}</p>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => openDetails(p)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block content-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.amount}</TableCell>
                <TableCell>{p.requested_by}</TableCell>
                <TableCell>
                  <span className={statusClasses[p.status]}>
                    {statusIcons[p.status]}
                    {statusLabels[p.status]}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDetails(p)}
                  >
                    Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Create Payment Request</DialogTitle>
          </DialogHeader>

          <NewExecutionForm onSuccess={() => setOpenCreate(false)} />
        </DialogContent>
      </Dialog>


      {/* DETAILS MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-3 text-sm">
              <div><b>ID:</b> {selected.id}</div>
              <div><b>Amount:</b> {selected.amount}</div>
              <div><b>Requested By:</b> {selected.requested_by}</div>
              <div className="flex items-center gap-2">
                <b>Status:</b>
                <span className={statusClasses[selected.status]}>
                  {statusLabels[selected.status]}
                </span>
              </div>
            </div>
          )}

          {selected?.status === "PENDING" && (
            <DialogFooter className="gap-2">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => updateStatus("APPROVED")}
              >
                <Check className="w-4 h-4 mr-1" /> Accept
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => updateStatus("REJECTED")}
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Payments;
