import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  subtitle: string;
}


export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
      <div className="page-header mb-0">
        <h1 className="page-title font-['Outfit']">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full sm:w-48 md:w-64 bg-card border-border"
          />
        </div>
        
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>
    </header>
  );
}
