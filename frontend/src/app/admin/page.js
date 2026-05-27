"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardTab from "@/components/admin/tabs/DashboardTab";
import InvestorsTab from "@/components/admin/tabs/InvestorsTab";
import TransactionsTab from "@/components/admin/tabs/TransactionsTab";
import StagesTab from "@/components/admin/tabs/StagesTab";
import AllocationsTab from "@/components/admin/tabs/AllocationsTab";
import ReferralsTab from "@/components/admin/tabs/ReferralsTab";
import SettingsTab from "@/components/admin/tabs/SettingsTab";

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <DashboardTab />;
      case "investors":
        return <InvestorsTab />;
      case "transactions":
        return <TransactionsTab />;
      case "stages":
        return <StagesTab />;
      case "allocations":
        return <AllocationsTab />;
      case "referrals":
        return <ReferralsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderTabContent()}
    </AdminLayout>
  );
}
