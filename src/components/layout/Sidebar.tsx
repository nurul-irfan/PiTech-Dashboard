import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowDownToLine,
  ListChecks,
  Clock,
  Wallet,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: LayoutDashboard, label: "Admin", path: "/admins" },
  { icon: LayoutDashboard, label: "Payment Request", path: "/payments" },
  { icon: Clock, label: "Transactions", path: "/transactions" },
  { icon: ListChecks, label: "Crypto Settlement", path: "/settlements", badge: 3 },
  { icon: FileText, label: "Payment Audit", path: "/audit" },
  { icon: LayoutDashboard, label: "User", path: "/users" },
  { icon: FileText, label: "System Logs", path: "/system-logs" },
  { icon: MessageSquare, label: "Support", path: "/supports", badge: 2 },
  { icon: MessageSquare, label: "Tickets", path: "/tickets", badge: 2 },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 min-h-screen bg-sidebar flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header with Close Button (Mobile) */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border-2 border-sidebar-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-sidebar-primary" />
            </div>
            <div>
              <h1 className="text-sidebar-foreground font-bold text-lg font-['Outfit']">PI Tech</h1>
              <p className="text-sidebar-foreground/60 text-xs">Payment Processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={isActive ? "sidebar-menu-item-active" : "sidebar-menu-item"}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="px-4 py-2">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={location.pathname === "/settings" ? "sidebar-menu-item-active" : "sidebar-menu-item"}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <span className="text-sidebar-primary-foreground font-semibold text-sm">PT</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sidebar-foreground font-medium text-sm truncate">PI Tech Admin</p>
              <p className="text-sidebar-foreground/60 text-xs">ADMIN</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors flex-shrink-0"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
