import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket, Crown } from "lucide-react";
import { useTakeaway } from "@/context/TakeawayContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const TakeawayHeader = () => {
  const { totalItems, unlocked } = useTakeaway();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isHome
          ? "border-transparent bg-white/60 backdrop-blur-md"
          : "border-border/60 bg-background/95 backdrop-blur-md",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground">
            Fortune House
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {unlocked ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-highlight/10 px-3 py-1 text-xs text-primary">
              <Crown className="h-3 w-3" /> VIP
            </span>
          ) : null}

          <Button asChild variant="ghost" size="sm" className="relative">
            <Link to="/checkout">
              <ShoppingBasket className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};