import { Flame, LockKeyhole, Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dish } from "@/data/menu";

export const DishCard = ({
  dish,
  unlocked,
  quantity,
  onAdd,
  onLockedAdd,
  onRemove,
}: {
  dish: Dish;
  unlocked: boolean;
  quantity: number;
  onAdd: () => void;
  onLockedAdd: () => void;
  onRemove: () => void;
}) => {
  return (
    <Card className="group overflow-hidden border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/50 bg-secondary/30">
        <img
          src={dish.image}
          alt={dish.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {dish.popular ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-highlight px-3 py-1 text-xs text-highlight-foreground shadow-soft">
              <Star className="h-3.5 w-3.5 fill-current" /> Popular
            </span>
          ) : null}
          {dish.price >= 10 ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-panel/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Flame className="h-3.5 w-3.5" /> Chef's pick
            </span>
          ) : null}
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-card-foreground">{dish.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{dish.ingredients}</p>
          </div>
          <p className="whitespace-nowrap font-display text-2xl text-primary">£{dish.price.toFixed(2)}</p>
        </div>

        <p className="min-h-20 text-sm leading-6 text-muted-foreground">{dish.description}</p>

        <div className="flex items-center justify-between gap-3">
          {quantity > 0 ? (
            <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-panel px-3 py-2 text-sm text-foreground">
              <button type="button" onClick={onRemove} className="h-7 w-7 rounded-full border border-border/70 text-base text-muted-foreground transition hover:text-foreground" aria-label={`Remove one ${dish.name}`}>
                −
              </button>
              <span>{quantity} in cart</span>
              <button type="button" onClick={onAdd} className="h-7 w-7 rounded-full border border-border/70 text-base text-muted-foreground transition hover:text-foreground" aria-label={`Add one more ${dish.name}`}>
                +
              </button>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Ready for your Friday night feast</span>
          )}

          <Button variant={unlocked ? "hero" : "locked"} onClick={unlocked ? onAdd : onLockedAdd}>
            {unlocked ? <Plus className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};