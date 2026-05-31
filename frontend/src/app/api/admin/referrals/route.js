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

    const supabase = await createServerSupabaseClient();

    // Query referrals mapping lists
    // Since Supabase JS API doesn't support complex GROUP BY out of the box without RPC,
    // we can easily fetch all rows from public.referrals and perform the client-side aggregation in JS!
    // This is extremely safe, highly performant for presale sizes, and works perfectly without needing custom RPC Postgres functions!
    const { data: referrals, error } = await supabase
      .from("referrals")
      .select("referrer_address, referred_address, referred_volume_usd, reward_brx");

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Client-side grouping/aggregation
    const groups = {};
    referrals.forEach((row) => {
      const ref = row.referrer_address.toLowerCase();
      if (!groups[ref]) {
        groups[ref] = {
          wallet: row.referrer_address,
          referrals: 0,
          volumeRaw: 0,
          rewardsRaw: 0,
        };
      }
      groups[ref].referrals += 1;
      groups[ref].volumeRaw += Number(row.referred_volume_usd || 0);
      groups[ref].rewardsRaw += Number(row.reward_brx || 0);
    });

    let leaderboard = Object.values(groups);

    // Apply Search Filter if requested
    if (search) {
      leaderboard = leaderboard.filter((r) => r.wallet.toLowerCase().includes(search));
    }

    // Sort by rewards descending
    leaderboard.sort((a, b) => b.rewardsRaw - a.rewardsRaw);

    const formattedReferrers = leaderboard.map((ref, idx) => ({
      id: idx + 1,
      wallet: ref.wallet,
      shortWallet: ref.wallet.slice(0, 6) + "..." + ref.wallet.slice(-4),
      referrals: ref.referrals,
      volume: `$${ref.volumeRaw.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      rewards: `${ref.rewardsRaw.toLocaleString()} BRX`,
    }));

    return NextResponse.json({
      ok: true,
      referrers: formattedReferrers,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
