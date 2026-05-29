import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";
import { TakeawayHeader } from "@/components/TakeawayHeader";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TakeawayHeader />
      <main className="container flex flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-8xl text-primary">404</p>
        <h1 className="mt-4 font-display text-4xl">Page not found</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild variant="hero" className="mt-8">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to the menu
          </Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;