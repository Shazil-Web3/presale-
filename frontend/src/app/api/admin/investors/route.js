import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request) {
  // Validate Admin Access Key
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase();
    const status = searchParams.get("status")?.trim();

    const supabase = await createServerSupabaseClient();

    let query = supabase
      .from("investors")
      .select("wallet_address, total_invested_usd, brx_allocation, latest_network, verification_status, created_at");

    if (search) {
      query = query.ilike("wallet_address", `%${search}%`);
    }

    if (status && status !== "All") {
      query = query.eq("verification_status", status);
    }

    // Default order by joining date
    query = query.order("created_at", { ascending: false });

    const { data: investors, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const formattedInvestors = investors.map((inv) => ({
      id: inv.wallet_address,
      wallet: inv.wallet_address,
      amount: `$${Number(inv.total_invested_usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      tokens: `${Number(inv.brx_allocation).toLocaleString()}`,
      network: inv.latest_network === "BSC" ? "BSC" : "ETH",
      status: inv.verification_status,
      date: new Date(inv.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json({
      ok: true,
      investors: formattedInvestors,
      totalCount: formattedInvestors.length,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint to update verification/KYC status of an investor
export async function POST(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { walletAddress, status } = payload ?? {};

    if (!walletAddress || !status) {
      return NextResponse.json(
        { ok: false, error: "Missing walletAddress or status." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("investors")
      .update({
        verification_status: status,
      })
      .eq("wallet_address", walletAddress.toLowerCase());

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Investor status updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
