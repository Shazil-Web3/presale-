export default function InvestorDirectory() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-liquidity-emerald">
        Investor Directory
      </h2>
      <p className="text-sm text-muted-foreground">
        Indexed wallet records are queryable by network and export-ready for CSV
        operations.
      </p>
      <div className="rounded-xl border border-white/10 bg-background/60 p-4 text-sm text-muted-foreground">
        Directory stream placeholder for real-time Supabase table views.
      </div>
    </div>
  );
}
