import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import SettlementQueue from "./pages/SettlementQueue";
import Transactions from "./pages/Transactions";
import FeeWallet from "./pages/FeeWallet";
import Tickets from "./pages/Tickets";
import AuditLogs from "./pages/AuditLogs";
import SystemLogs from "./pages/SystemLogs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"
import Supports from "./pages/Supports";
import AdminManagement from "./pages/Admins";
import UserManagement from "./pages/Users";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Index />} />
            <Route path="/admins" element={<AdminManagement />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settlements" element={<SettlementQueue />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/system-logs" element={<SystemLogs />} />
            <Route path="/supports" element={<Supports />} />
            <Route path="/tickets" element={<Tickets />} />


            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
