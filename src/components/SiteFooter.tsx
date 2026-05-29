export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/20 py-10">
      <div className="container text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-foreground">Fortune House</p>
        <p className="mt-2">Modern Chinese takeaway — order online for collection or delivery.</p>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} Fortune House. All rights reserved.</p>
      </div>
    </footer>
  );
};