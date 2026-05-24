export default function AllocationMatrix() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-acid-lime">Allocation Matrix</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card label="Purchased BRX" value="2,430,000" />
        <Card label="Avg Entry Price" value="$0.0067" />
        <Card label="Unlocked Claimable" value="324,000" />
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
