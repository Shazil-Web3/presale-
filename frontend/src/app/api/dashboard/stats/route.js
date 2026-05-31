import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet")?.trim().toLowerCase();

    if (!wallet) {
      return NextResponse.json(
        { ok: false, error: "Wallet address is required." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const timestamp = new Date().toISOString();

    // 1. Auto-register/Upsert Investor Record when visiting dashboard
    const { error: upsertError } = await supabase.from("investors").upsert(
      {
        wallet_address: wallet,
        last_seen_at: timestamp,
      },
      { onConflict: "wallet_address" }
    );

    if (upsertError) {
      return NextResponse.json(
        { ok: false, error: upsertError.message },
        { status: 500 }
      );
    }

    // 2. Fetch Stored Investor Details
    const { data: investor, error: investorError } = await supabase
      .from("investors")
      .select("total_invested_usd, brx_allocation, verification_status")
      .eq("wallet_address", wallet)
      .single();

    if (investorError) {
      return NextResponse.json(
        { ok: false, error: investorError.message },
        { status: 500 }
      );
    }

    // 3. Fetch Active Stage Info
    const { data: activeStage, error: stageError } = await supabase
      .from("presale_stages")
      .select("id, name, price_usd, raised_usd, hard_cap_usd")
      .eq("status", "Active")
      .maybeSingle();

    if (stageError) {
      return NextResponse.json(
        { ok: false, error: stageError.message },
        { status: 500 }
      );
    }

    // Calculate dynamic raised USD for the active stage from successful transactions in the database
    let dynamicRaisedUsd = 0;
    if (activeStage) {
      const { data: stageTxs, error: txSumError } = await supabase
        .from("transactions")
        .select("amount_paid_usd")
        .eq("stage_id", activeStage.id)
        .eq("status", "Success");

      if (!txSumError && stageTxs) {
        dynamicRaisedUsd = stageTxs.reduce((sum, r) => sum + Number(r.amount_paid_usd || 0), 0);
      }
    }

    // 4. Fetch Referral Earnings
    const { data: referrals, error: referralError } = await supabase
      .from("referrals")
      .select("reward_brx")
      .eq("referrer_address", wallet);

    if (referralError) {
      return NextResponse.json(
        { ok: false, error: referralError.message },
        { status: 500 }
      );
    }

    const referralRewardsBrx = referrals?.reduce(
      (sum, row) => sum + Number(row.reward_brx || 0),
      0
    ) || 0;

    const stats = {
      totalInvestedUsd: Number(investor?.total_invested_usd || 0),
      brxAllocation: Number(investor?.brx_allocation || 0),
      referralRewardsBrx,
      verificationStatus: investor?.verification_status || "Pending",
      activeStage: activeStage
        ? {
            name: activeStage.name,
            priceUsd: Number(activeStage.price_usd),
            raisedUsd: dynamicRaisedUsd, // Dynamically computed from database transactions
            hardCapUsd: Number(activeStage.hard_cap_usd),
            percentComplete:
              activeStage.hard_cap_usd > 0
                ? Number(
                    ((dynamicRaisedUsd / activeStage.hard_cap_usd) * 100).toFixed(2)
                  )
                : 0,
          }
        : null,
    };

    return NextResponse.json({ ok: true, stats });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
