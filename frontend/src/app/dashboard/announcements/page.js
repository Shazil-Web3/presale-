"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Megaphone, Calendar, ArrowRight, Tag } from "lucide-react";

const allAnnouncements = [
  { 
    title: "Phase 2 Launch Approaching", 
    date: "May 24, 2026", 
    tag: "Important",
    description: "Private Sale Phase 1 is nearing completion. Prepare for upcoming pricing adjustments. Phase 2 will start on June 1st with a price of $0.0075 per BRX.",
    color: "text-red-400"
  },
  { 
    title: "Dashboard Upgrade Released", 
    date: "May 22, 2026", 
    tag: "Feature",
    description: "New allocation tracking and referral analytics are now available. We've added more detailed transaction history and real-time progress bars.",
    color: "text-blue-400"
  },
  { 
    title: "Partnership with Quantum Labs", 
    date: "May 15, 2026", 
    tag: "Ecosystem",
    description: "We are excited to announce our technical partnership with Quantum Labs to enhance our Layer 2 scaling solutions.",
    color: "text-acid-lime"
  },
  { 
    title: "Tokenomics Paper Update", 
    date: "May 10, 2026", 
    tag: "Docs",
    description: "We have updated our tokenomics paper with more details on the ecosystem fund and developer grants.",
    color: "text-purple-400"
  },
];

export default function AnnouncementsPage() {
  return (
    <DashboardLayout 
      title="Announcements" 
      subtitle="Stay updated with the latest project news and developments."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {allAnnouncements.map((news, i) => (
          <section key={i} className="quantum-panel rounded-[32px] p-8 hover:bg-white/[0.03] transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider ${news.color}`}>
                  {news.tag}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {news.date}
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3 group-hover:text-acid-lime transition-colors">{news.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {news.description}
            </p>

            <button className="flex items-center gap-2 text-sm font-bold text-acid-lime hover:gap-3 transition-all">
              Read More <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        ))}
      </div>
    </DashboardLayout>
  );
}
