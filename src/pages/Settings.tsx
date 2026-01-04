import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, Link, Save } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Settings" 
        subtitle="Configure platform settings and integrations" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Profile Settings */}
        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Profile Settings</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Manage your account details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs md:text-sm font-medium mb-1 block">Display Name</label>
              <Input defaultValue="PI Tech Admin" className="h-10 md:h-11" />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium mb-1 block">Email Address</label>
              <Input defaultValue="admin@pitech.io" className="h-10 md:h-11" />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium mb-1 block">Role</label>
              <Input defaultValue="Super Admin" disabled className="h-10 md:h-11" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2 w-full sm:w-auto">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Security</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Two-factor authentication & security</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Two-Factor Auth</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Add extra security</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Session Timeout</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Logout after 30 min</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">IP Whitelisting</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Restrict to specific IPs</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Notifications</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Configure alert preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">New Payments</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Gateway alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Pending Settlements</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Approval needed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Support Tickets</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Bank queries</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Email Alerts</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Via email</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* API Integration */}
        <div className="content-card p-4 md:p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
              <Link className="w-4 h-4 md:w-5 md:h-5 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">API Integrations</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Manage external connections</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 md:p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between mb-1 md:mb-2 gap-2">
                <p className="font-medium text-sm md:text-base">Bank Sync API</p>
                <span className="status-badge status-settled text-[10px] md:text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Connected
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Syncs transactions with banks</p>
            </div>
            <div className="p-3 md:p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between mb-1 md:mb-2 gap-2">
                <p className="font-medium text-sm md:text-base">Payment Gateway</p>
                <span className="status-badge status-settled text-[10px] md:text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Connected
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Fiat-to-crypto conversions</p>
            </div>
            <div className="p-3 md:p-4 bg-muted border border-border rounded-lg">
              <div className="flex items-center justify-between mb-1 md:mb-2 gap-2">
                <p className="font-medium text-sm md:text-base">Blockchain RPC</p>
                <span className="status-badge status-settled text-[10px] md:text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Connected
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">ETH Mainnet for settlements</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
