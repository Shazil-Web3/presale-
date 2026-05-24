"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdminOverview from "@/components/admin-tabs/AdminOverview";
import InvestorDirectory from "@/components/admin-tabs/InvestorDirectory";
import MasterLedger from "@/components/admin-tabs/MasterLedger";
import StageControls from "@/components/admin-tabs/StageControls";
import ManualDistribution from "@/components/admin-tabs/ManualDistribution";

const tabs = [
  { id: "overview", label: "Overview", component: AdminOverview },
  { id: "investors", label: "Investor Directory", component: InvestorDirectory },
  { id: "ledger", label: "Master Ledger", component: MasterLedger },
  { id: "stages", label: "Stage Controls", component: StageControls },
  {
    id: "distribution",
    label: "Manual Distribution",
    component: ManualDistribution,
  },
];

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState("overview");
  const ActiveComponent =
    tabs.find((tab) => tab.id === currentTab)?.component ?? AdminOverview;

  return (
    <section className="w-full space-y-5">
      <header className="rounded-3xl quantum-panel p-6">
        <h1 className="text-2xl font-semibold text-liquidity-emerald">
          Super Admin Panel
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Revenue analytics, investor indexing, ledger integrity, and presale
          stage control in a single command surface.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-surface/80 p-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCurrentTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-liquidity-emerald text-black"
                  : "bg-background/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="rounded-3xl border border-white/10 bg-surface/70 p-6"
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
