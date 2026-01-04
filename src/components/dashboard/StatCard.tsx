import { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "accent";
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const baseClasses = "rounded-xl p-4 md:p-6 shadow-sm transition-all hover:shadow-md animate-fade-in";
  
  const variantClasses = {
    default: "bg-card border border-border text-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  const iconBgClasses = {
    default: "bg-primary/10",
    primary: "bg-primary-foreground/20",
    accent: "bg-accent-foreground/20",
  };

  const iconColorClasses = {
    default: "text-primary",
    primary: "text-primary-foreground",
    accent: "text-accent-foreground",
  };

  const subtitleClasses = {
    default: "text-muted-foreground",
    primary: "text-primary-foreground/70",
    accent: "text-accent-foreground/70",
  };

  const trendClasses = {
    default: "text-success",
    primary: "text-primary-foreground",
    accent: "text-accent-foreground",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${iconBgClasses[variant]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColorClasses[variant]}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${trendClasses[variant]}`}>
            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
            {trend}
          </div>
        )}
      </div>
      <p className={`text-xs md:text-sm ${subtitleClasses[variant]} mb-1`}>{title}</p>
      <p className="text-xl md:text-2xl lg:text-3xl font-bold font-['Outfit']">{value}</p>
      <p className={`text-xs ${subtitleClasses[variant]} mt-1 hidden sm:block`}>{subtitle}</p>
    </div>
  );
}
