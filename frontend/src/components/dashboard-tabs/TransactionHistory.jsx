const entries = [
  { hash: "0x9a...2f1", network: "BSC", token: "USDT", brx: "500,000" },
  { hash: "0x4b...ab3", network: "ETH", token: "USDC", brx: "320,000" },
];

export default function TransactionHistory() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-acid-lime">Transaction History</h2>
      <div className="space-y-2">
        {entries.map((item) => (
          <div
            key={item.hash}
            className="grid gap-1 rounded-xl border border-white/10 bg-background/60 p-3 text-sm sm:grid-cols-4"
          >
            <span>{item.hash}</span>
            <span className="text-muted-foreground">{item.network}</span>
            <span className="text-liquidity-emerald">{item.token}</span>
            <span>{item.brx} BRX</span>
          </div>
        ))}
      </div>
    </div>
  );
}
