import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function StageControls() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-liquidity-emerald">
        Stage Controls
      </h2>
      <Input placeholder="Stage ID" />
      <Input placeholder="Stage price (USD)" />
      <Input placeholder="Hard cap (USD)" />
      <Button>Push Stage Update</Button>
    </div>
  );
}
