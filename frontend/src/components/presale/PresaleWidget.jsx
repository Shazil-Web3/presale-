"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/input";
import Progress from "@/components/ui/progress";
import Button from "@/components/ui/button";

const stage = {
  index: 1,
  price: 0.005,
  hardCapUsd: 500000,
  raisedUsd: 132500,
};

export default function PresaleWidget() {
  const [usdAmount, setUsdAmount] = useState("");
  const quantity = useMemo(() => {
    const value = Number(usdAmount);
    if (!value || value <= 0) return 0;
    return value / stage.price;
  }, [usdAmount]);

  const progress = (stage.raisedUsd / stage.hardCapUsd) * 100;

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-background/50 p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
        <span className="text-liquidity-emerald">Stage {stage.index}</span>
        <span className="text-muted-foreground">${stage.price.toFixed(3)} / BRX</span>
      </div>
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground">
        ${stage.raisedUsd.toLocaleString()} raised of $
        {stage.hardCapUsd.toLocaleString()} cap.
      </p>

      <Input
        inputMode="decimal"
        placeholder="Enter USD amount"
        value={usdAmount}
        onChange={(event) => setUsdAmount(event.target.value)}
      />
      <p className="text-sm">
        Estimated BRX:{" "}
        <span className="font-semibold text-acid-lime">
          {quantity.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
      </p>
      <Button className="w-full">Execute Buy Signal</Button>
    </div>
  );
}
