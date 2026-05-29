import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "text-sm transition-colors hover:text-foreground",
        isActive ? "text-foreground font-medium" : "text-muted-foreground",
      )}
    >
      {children}
    </Link>
  );
};