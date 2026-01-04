import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { PendingSettlements } from "@/components/dashboard/PendingSettlements";
import { TrendingUp, Clock, DollarSign, CheckCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Dashboard" 
        subtitle="PI Tech Processing Overview - Manage fiat-to-crypto settlements and fees" 
      />

      {/* Welcome Message */}
      <p className="text-muted-foreground mb-4 lg:mb-6">
        Welcome back. Here's what's happening with your settlements.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          title="Total Incoming"
          value="52"
          subtitle="All received from gateways"
          icon={TrendingUp}
          trend="+15%"
        />
        <StatCard
          title="Pending Processes"
          value="4"
          subtitle="Awaiting fee deduction"
          icon={Clock}
          variant="primary"
        />
        <StatCard
          title="Fees Collected"
          value="$1.8M"
          subtitle="10% fees retained lifetime"
          icon={DollarSign}
          trend="+10%"
        />
        <StatCard
          title="Settled Today"
          value="$2.5M"
          subtitle="Successfully completed"
          icon={CheckCircle}
          variant="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="xl:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <PendingSettlements />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
