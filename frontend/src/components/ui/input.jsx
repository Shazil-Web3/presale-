import { cn } from "@/lib/utils";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/15 bg-background/70 px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-liquidity-emerald",
        className
      )}
      {...props}
    />
  );
}
