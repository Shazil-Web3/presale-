"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Megaphone, Calendar, ArrowRight, Tag, RefreshCw } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/announcements");
      const data = await res.json();
      if (data.ok) {
        setAnnouncements(data.announcements);
      }
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <DashboardLayout 
      title="Announcements" 
      subtitle="Stay updated with the latest project news and developments."
    >
      <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
        {loading ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center gap-4">
            <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Fetching Announcements...</span>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No active announcements found. Check back later for official project updates!
          </div>
        ) : (
          announcements.map((news, i) => (
            <section key={i} className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 hover:bg-white/[0.03] transition-all group border-white/5 bg-surface/30">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest ${news.color}`}>
                    {news.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/60">
                    <Calendar className="h-3.5 w-3.5" />
                    {news.date}
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-acid-lime transition-colors text-foreground leading-tight">{news.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base max-w-3xl">
                {news.description}
              </p>

              <button className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-acid-lime hover:gap-3 transition-all">
                Read More <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
