import { useMemo, useState } from "react";
import { Crown, Flame, LockKeyhole, Plus, ScrollText, ShieldCheck, Star } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { SiteFooter } from "@/components/SiteFooter";
import { TakeawayHeader } from "@/components/TakeawayHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bundleMeals } from "@/data/bundles";
import { useTakeaway } from "@/context/TakeawayContext";
import { categories, menu, popularityReference } from "@/data/menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { unlocked, cart, addToCart, removeFromCart, unlockWithCode, totalItems } = useTakeaway();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number] | "All">("All");
  const [vipDialogOpen, setVipDialogOpen] = useState(false);
  const [vipInput, setVipInput] = useState("");
  const [vipError, setVipError] = useState<string | null>(null);
  const [vipSubmitting, setVipSubmitting] = useState(false);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return menu;
    return menu.filter((dish) => dish.category === activeCategory);
  }, [activeCategory]);

  const handleLockedAdd = () => {
    setVipInput("");
    setVipError(null);
    setVipDialogOpen(true);
  };

  const submitVipCode = async () => {
    const code = vipInput.trim().slice(0, 64);
    if (!code) {
      setVipError("Please enter a code.");
      return;
    }
    setVipSubmitting(true);
    try {
      const ok = await unlockWithCode(code);
      if (ok) {
        setVipDialogOpen(false);
        setVipInput("");
        setVipError(null);
        toast({
          title: "VIP unlocked",
          description: "All Add to cart buttons are now available.",
        });
      } else {
        setVipError("That VIP code is not recognised. Please try again.");
      }
    } finally {
      setVipSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TakeawayHeader />

      <main>
        {/* Hero Section — Pinza-style full-bleed with warm gradient overlay */}
        <section className="relative min-h-screen flex items-end bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200/50 via-orange-100/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="relative z-10 w-full pb-16 pt-32">
            <div className="container">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                  <Crown className="h-4 w-4" /> Premium Chinese Takeaway
                </span>
                <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-7xl lg:text-8xl">
                  Modern Chinese takeaway, crafted for your table.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                  From chow mein to crispy duck, sweet & sour classics to black bean favourites — 30 carefully selected dishes, ready to order.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    <ScrollText className="h-4 w-4" />
                    Browse our menu
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleLockedAdd}>
                    <Crown className="h-4 w-4" />
                    Unlock VIP ordering
                  </Button>
                </div>
                {unlocked ? (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                    <ShieldCheck className="h-4 w-4" /> VIP unlocked — {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* VIP Info Bar */}
        <section className="border-b border-border/30 bg-secondary/35 py-10">
          <div className="container grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full border border-primary/30 bg-highlight p-3 text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-3xl">VIP ordering gate</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Add to cart stays greyed out until a valid VIP code is entered. Tap any locked button to enter your code.
                </p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-border/60 bg-card/90 p-4 text-sm leading-6 text-muted-foreground shadow-soft">
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <Star className="h-4 w-4 text-primary" /> Popular labels
              </span>
              <p className="mt-2">{popularityReference}</p>
            </div>
          </div>
        </section>

        {/* Bundles Section */}
        <section className="border-b border-border/30 bg-secondary/20 py-16">
          <div className="container space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-primary">Bundles</p>
              <h2 className="mt-2 font-display text-5xl text-foreground">Curated set meals for one, two or four</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">Each bundle spells out exactly what is included, making ordering simple and generous.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {bundleMeals.map((bundle) => (
                <Card key={bundle.id} className="overflow-hidden border-border/60 bg-card/95 shadow-soft">
                  <img src={bundle.image} alt={bundle.imageAlt} loading="lazy" width={600} height={440} className="aspect-[4/3] w-full object-cover" />
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary">{bundle.badge}</p>
                        <p className="mt-2 font-display text-3xl text-foreground">{bundle.name}</p>
                      </div>
                      <p className="whitespace-nowrap font-display text-2xl text-primary">£{bundle.price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                    <p className="text-sm font-medium text-foreground">{bundle.serves}</p>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Includes</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        {bundle.includes.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <span className="text-sm text-muted-foreground">{unlocked ? "Bundle ready to add" : "Unlock with VIP code first"}</span>
                      <Button variant={unlocked ? "hero" : "locked"} onClick={unlocked ? () => addToCart(bundle.id) : handleLockedAdd}>
                        {unlocked ? <Plus className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
                        Add to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="container py-16 md:py-20">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-primary">Menu</p>
              <h2 className="mt-2 font-display text-5xl text-foreground">A full takeaway board of classics</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                30 classic UK Chinese takeaway dishes with friendly descriptions, classic pricing in GBP and illustrated menu cards for each item.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  activeCategory === "All"
                    ? "border-primary/40 bg-highlight text-highlight-foreground shadow-soft"
                    : "border-border/70 bg-panel text-muted-foreground hover:text-foreground",
                )}
              >
                All dishes
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    activeCategory === category
                      ? "border-primary/40 bg-highlight text-highlight-foreground shadow-soft"
                      : "border-border/70 bg-panel text-muted-foreground hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMenu.map((dish) => {
              const quantity = cart.find((item) => item.dishId === dish.id)?.quantity ?? 0;
              return (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  unlocked={unlocked}
                  quantity={quantity}
                  onAdd={() => addToCart(dish.id)}
                  onRemove={() => removeFromCart(dish.id)}
                  onLockedAdd={handleLockedAdd}
                />
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/30 py-16">
          <div className="container grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Flame,
                title: "Tasteful classics",
                text: "Traditional warm tones, gold accents and a menu shaped for a proper neighbourhood takeaway — Pinza-inspired presentation.",
              },
              {
                icon: Crown,
                title: "VIP unlock",
                text: "A simple VIP prompt keeps ordering gated until the right code is entered, just as requested.",
              },
              {
                icon: ShieldCheck,
                title: "House bundles",
                text: "Set meals for one, two or four make ordering simpler when you want the classics picked for you.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/60 bg-card/90 shadow-soft">
                <CardContent className="p-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <p className="mt-4 font-display text-3xl">{feature.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* VIP Dialog */}
      <Dialog open={vipDialogOpen} onOpenChange={setVipDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">Enter your VIP code</DialogTitle>
            <DialogDescription>
              Add to cart unlocks once a valid VIP code is entered.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submitVipCode();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="vip-code">VIP code</Label>
              <Input
                id="vip-code"
                type="text"
                inputMode="text"
                autoComplete="off"
                autoFocus
                maxLength={64}
                value={vipInput}
                onChange={(e) => {
                  setVipInput(e.target.value);
                  if (vipError) setVipError(null);
                }}
                placeholder="Your VIP code"
              />
              {vipError ? (
                <p className="text-sm text-destructive" role="alert">
                  {vipError}
                </p>
              ) : null}
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button type="button" variant="outline" onClick={() => setVipDialogOpen(false)} disabled={vipSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={vipSubmitting}>
                {vipSubmitting ? "Checking…" : "Unlock"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;