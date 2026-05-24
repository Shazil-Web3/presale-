export default function AdminOverview() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Metric label="Total Raised" value="$2.84M" />
      <Metric label="Unique Investors" value="1,742" />
      <Metric label="Current Stage" value="03" />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-liquidity-emerald">{value}</p>
    </div>
  );
}
