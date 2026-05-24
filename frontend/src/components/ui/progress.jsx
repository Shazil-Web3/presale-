import { cn } from "@/lib/utils";

export default function Progress({ value = 0, className }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/10",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-liquidity-emerald transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
