import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquareText, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { TakeawayHeader } from "@/components/TakeawayHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bundleMeals } from "@/data/bundles";
import { menu } from "@/data/menu";
import { useTakeaway } from "@/context/TakeawayContext";
import { CHECKOUT_COOLDOWN_MS, WHATSAPP_NUMBER } from "@/config/business";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

function sanitizeForMessage(value: string, maxLen = 80): string {
  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[^\p{L}\p{N}\s.,&'()£$+\-/]/gu, "")
    .trim()
    .slice(0, maxLen);
}

const Checkout = () => {
  const { cart, totalPrice, clearCart, removeFromCart, addToCart, vipCode } = useTakeaway();
  const [submitted, setSubmitted] = useState(false);
  const lastClickRef = useRef(0);

  const cartLines = cart
    .map((item) => {
      const dish = [...menu, ...bundleMeals].find((entry) => entry.id === item.dishId);
      if (!dish) return null;
      return { ...dish, quantity: item.quantity, lineTotal: dish.price * item.quantity };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const handleCheckout = () => {
    const now = Date.now();
    if (now - lastClickRef.current < CHECKOUT_COOLDOWN_MS) return;
    lastClickRef.current = now;

    if (!cartLines.length) return;

    if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
      toast({
        title: "Order could not be sent",
        description: "The takeaway phone number is misconfigured. Please contact the shop.",
        variant: "destructive",
      });
      return;
    }

    const orderHeader = vipCode ? `VIP code: ${vipCode}` : "VIP order";
    const orderParts: string[] = [orderHeader];

    cartLines.forEach((dish) => {
      const name = sanitizeForMessage(dish.name);
      const qty = Math.min(Math.max(Math.floor(dish.quantity), 1), 50);
      if (name) {
        orderParts.push(name, String(qty));
      }
    });

    const safeTotal = Number.isFinite(totalPrice) ? totalPrice : 0;
    orderParts.push(`£${safeTotal.toFixed(2)}`);

    const message = orderParts.join(", ").slice(0, 1500);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    clearCart();

    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      window.location.assign(whatsappUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TakeawayHeader />
      <main className="container py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Checkout</p>
            <h1 className="mt-2 font-display text-5xl text-foreground">Your order</h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to menu
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <Card className="border-border/70 bg-card/95 shadow-lift">
            <CardHeader>
              <CardTitle className="font-display text-3xl">Basket details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartLines.length ? (
                cartLines.map((dish) => (
                  <div key={dish.id} className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={dish.image} alt={dish.imageAlt} className="h-20 w-24 rounded-xl border border-border/60 object-cover" />
                      <div>
                        <p className="font-display text-2xl">{dish.name}</p>
                        <p className="text-sm text-muted-foreground">£{dish.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background px-3 py-2">
                        <button type="button" onClick={() => removeFromCart(dish.id)} className="h-8 w-8 rounded-full border border-border/70 text-muted-foreground transition hover:text-foreground" aria-label={`Remove one ${dish.name}`}>
                          −
                        </button>
                        <span>{dish.quantity}</span>
                        <button type="button" onClick={() => addToCart(dish.id)} className="h-8 w-8 rounded-full border border-border/70 text-muted-foreground transition hover:text-foreground" aria-label={`Add one ${dish.name}`}>
                          +
                        </button>
                      </div>
                      <p className="min-w-20 text-right font-display text-2xl text-primary">£{dish.lineTotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-border/70 bg-panel p-8 text-center">
                  <p className="font-display text-3xl">Your basket is waiting.</p>
                  <p className="mt-3 text-muted-foreground">Unlock the menu with the VIP code and add a few classics before checking out.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/70 bg-card/95 shadow-lift">
              <CardHeader>
                <CardTitle className="font-display text-3xl">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Collection / delivery confirmation</span>
                  <span>By text message</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Payment</span>
                  <span>Cash to driver</span>
                </div>
                <div className="border-t border-border/60 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl">Total</span>
                    <span className="font-display text-4xl text-primary">£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button variant="hero" size="lg" className="w-full" onClick={handleCheckout} disabled={!cartLines.length}>
                  Place checkout request
                </Button>
              </CardContent>
            </Card>

            {submitted ? (
              <Card className="border-primary/40 bg-highlight shadow-glow">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <MessageSquareText className="mt-1 h-5 w-5 text-highlight-foreground" />
                    <div>
                      <p className="font-display text-3xl text-highlight-foreground">Thanks — we have your order.</p>
                      <p className="mt-2 text-sm leading-6 text-highlight-foreground/80">
                        Your WhatsApp order has been prepared for sending. The takeaway will text you with order confirmation and an estimated delivery time. Please prepare cash for the delivery driver.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-highlight-foreground/20 bg-background/70 p-4 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4 text-primary" />
                    Cash-on-delivery reminder saved.
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Checkout;