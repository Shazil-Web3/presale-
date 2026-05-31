import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request) {
  // Validate Admin Access Key
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createServerSupabaseClient();

    // 1. Fetch Investors count
    const { count: investorsCount, error: countError } = await supabase
      .from("investors")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json({ ok: false, error: countError.message }, { status: 500 });
    }

    // 2. Fetch Active Stage Info
    const { data: activeStage, error: stageError } = await supabase
      .from("presale_stages")
      .select("id, name, hard_cap_usd")
      .eq("status", "Active")
      .maybeSingle();

    if (stageError) {
      return NextResponse.json({ ok: false, error: stageError.message }, { status: 500 });
    }

    // 3. Fetch Sum of Successful Transaction Capital
    const { data: allTxs, error: txError } = await supabase
      .from("transactions")
      .select("amount_paid_usd, brx_quantity, status, stage_id");

    if (txError) {
      return NextResponse.json({ ok: false, error: txError.message }, { status: 500 });
    }

    const successfulTxs = allTxs.filter((tx) => tx.status === "Success");
    const totalRaised = successfulTxs.reduce((sum, r) => sum + Number(r.amount_paid_usd || 0), 0);

    // 4. Fetch Pending Allocations count
    const pendingTxs = allTxs.filter((tx) => tx.status === "Pending");
    const pendingCount = pendingTxs.length;

    // 5. Fetch Recent Transactions
    const { data: recentTxs, error: recentError } = await supabase
      .from("transactions")
      .select("tx_hash, wallet_address, brx_quantity, captured_at, status")
      .order("captured_at", { ascending: false })
      .limit(6);

    if (recentError) {
      return NextResponse.json({ ok: false, error: recentError.message }, { status: 500 });
    }

    const recentActivity = recentTxs.map((tx) => ({
      id: tx.tx_hash,
      type: "purchase",
      user: tx.wallet_address.slice(0, 6) + "..." + tx.wallet_address.slice(-4),
      fullUser: tx.wallet_address,
      amount: `${Number(tx.brx_quantity).toLocaleString()} BRX`,
      time: formatRelativeTime(new Date(tx.captured_at)),
      status: tx.status === "Success" ? "Success" : tx.status,
    }));

    // 6. Compute Dynamic Allocation Summary Metrics (based on 200M total supply)
    const TOTAL_SUPPLY = 200000000;
    
    const totalDistributedRaw = successfulTxs.reduce((sum, tx) => sum + Number(tx.brx_quantity || 0), 0);
    const totalPendingClaimsRaw = pendingTxs.reduce((sum, tx) => sum + Number(tx.brx_quantity || 0), 0);
    const lockedTokensRaw = Math.max(0, TOTAL_SUPPLY - totalDistributedRaw - totalPendingClaimsRaw);
    
    const progressPercent = TOTAL_SUPPLY > 0 ? Number(((totalDistributedRaw / TOTAL_SUPPLY) * 100).toFixed(4)) : 0;

    return NextResponse.json({
      ok: true,
      stats: {
        totalRaised: `$${totalRaised.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        totalInvestors: (investorsCount || 0).toLocaleString(),
        currentStage: activeStage?.name || "None Active",
        pendingAllocations: (pendingCount || 0).toString(),
      },
      recentActivity,
      distribution: {
        progressPercent: progressPercent,
        totalDistributed: `${totalDistributedRaw.toLocaleString()} BRX`,
        totalClaimable: `${totalPendingClaimsRaw.toLocaleString()} BRX`,
        lockedTokens: `${lockedTokensRaw.toLocaleString()} BRX`,
        totalSupply: `${TOTAL_SUPPLY.toLocaleString()} BRX`
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function formatRelativeTime(date) {
  const diffMs = new Date() - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}
