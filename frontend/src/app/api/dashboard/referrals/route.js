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

    // Fetch all referrals where the user is the referrer
    const { data: referrals, error } = await supabase
      .from("referrals")
      .select("referred_address, referred_volume_usd, reward_brx, created_at")
      .eq("referrer_address", wallet);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const totalReferrals = referrals?.length || 0;
    const referredVolumeUsd = referrals?.reduce((sum, r) => sum + Number(r.referred_volume_usd || 0), 0) || 0;
    const rewardBrx = referrals?.reduce((sum, r) => sum + Number(r.reward_brx || 0), 0) || 0;

    const referredInvestors = referrals.map((r) => ({
      wallet: r.referred_address.slice(0, 6) + "..." + r.referred_address.slice(-4),
      fullWallet: r.referred_address,
      amountPaidUsd: Number(r.referred_volume_usd),
      amount: `$${Number(r.referred_volume_usd).toLocaleString()}`,
      reward: `${Number(r.reward_brx).toLocaleString()} BRX`,
      date: new Date(r.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    // Generate unique referral code based on referrer wallet
    // E.g., BRX + first 6 hex characters in uppercase
    const referralCode = `BRX${wallet.slice(2, 8).toUpperCase()}`;

    return NextResponse.json({
      ok: true,
      referralLink: `https://brx.io/ref/${referralCode}`,
      metrics: {
        totalReferrals,
        referredVolumeUsd,
        rewardBrx,
      },
      referredInvestors,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint to register a new referred connection
export async function POST(request) {
  try {
    const payload = await request.json();
    const { referredAddress, referrerCode } = payload ?? {};

    const normalizedReferred = referredAddress?.trim().toLowerCase();
    const code = referrerCode?.trim().toUpperCase();

    if (!normalizedReferred || !code) {
      return NextResponse.json(
        { ok: false, error: "Missing referredAddress or referrerCode." },
        { status: 400 }
      );
    }

    if (!code.startsWith("BRX") || code.length !== 9) {
      return NextResponse.json(
        { ok: false, error: "Invalid referral code format." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Check if referred user already has a registered referrer
    const { data: existing, error: existingError } = await supabase
      .from("referrals")
      .select("id")
      .eq("referred_address", normalizedReferred)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "This investor has already been referred." },
        { status: 400 }
      );
    }

    // Resolve referrer wallet address from code
    // We search the investors table for a wallet address whose slice matches the code
    const { data: investors, error: listError } = await supabase
      .from("investors")
      .select("wallet_address");

    if (listError) {
      return NextResponse.json(
        { ok: false, error: listError.message },
        { status: 500 }
      );
    }

    const matchedReferrer = investors.find(
      (inv) => `BRX${inv.wallet_address.slice(2, 8).toUpperCase()}` === code
    );

    if (!matchedReferrer) {
      return NextResponse.json(
        { ok: false, error: "Referral code not found." },
        { status: 404 }
      );
    }

    const referrerAddress = matchedReferrer.wallet_address;

    if (referrerAddress === normalizedReferred) {
      return NextResponse.json(
        { ok: false, error: "You cannot refer yourself." },
        { status: 400 }
      );
    }

    // Insert new referral mapping
    const { error: insertError } = await supabase.from("referrals").insert({
      referrer_address: referrerAddress,
      referred_address: normalizedReferred,
      referred_volume_usd: 0,
      reward_brx: 0,
      payout_status: "Pending",
    });

    if (insertError) {
      return NextResponse.json(
        { ok: false, error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Referral code bound successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
