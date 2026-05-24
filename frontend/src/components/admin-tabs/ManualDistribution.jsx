import Button from "@/components/ui/button";

export default function ManualDistribution() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-liquidity-emerald">
        Manual Distribution
      </h2>
      <p className="text-sm text-muted-foreground">
        Controlled BRX airdrop execution with audit checkpoints for exceptional
        settlement cases.
      </p>
      <Button variant="secondary">Run Distribution Audit</Button>
    </div>
  );
}
