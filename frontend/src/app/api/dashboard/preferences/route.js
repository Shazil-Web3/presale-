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

    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .select("purchase_confirmations, phase_adjustments, referral_rewards")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    // Default configuration if user has no saved preferences yet
    const config = preferences ?? {
      purchase_confirmations: true,
      phase_adjustments: true,
      referral_rewards: true,
    };

    return NextResponse.json({
      ok: true,
      preferences: {
        purchaseConfirmations: config.purchase_confirmations,
        phaseAdjustments: config.phase_adjustments,
        referralRewards: config.referral_rewards,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { walletAddress, purchaseConfirmations, phaseAdjustments, referralRewards } = payload ?? {};

    const normalizedWallet = walletAddress?.trim().toLowerCase();

    if (!normalizedWallet) {
      return NextResponse.json(
        { ok: false, error: "Wallet address is required." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from("user_preferences").upsert(
      {
        wallet_address: normalizedWallet,
        purchase_confirmations: Boolean(purchaseConfirmations),
        phase_adjustments: Boolean(phaseAdjustments),
        referral_rewards: Boolean(referralRewards),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "wallet_address" }
    );

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Preferences updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
