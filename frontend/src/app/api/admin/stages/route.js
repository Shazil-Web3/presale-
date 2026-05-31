import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: stages, error } = await supabase
      .from("presale_stages")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Fetch all successful transactions to compute dynamic raised totals per stage
    const { data: txs, error: txError } = await supabase
      .from("transactions")
      .select("stage_id, amount_paid_usd")
      .eq("status", "Success");

    const txsList = txError ? [] : txs;

    const formattedStages = stages.map((st) => {
      // Sum transactions matching this stage id
      const dynamicRaisedUsd = txsList
        .filter((tx) => tx.stage_id === st.id)
        .reduce((sum, tx) => sum + Number(tx.amount_paid_usd || 0), 0);

      return {
        id: st.id,
        name: st.name,
        price: `$${Number(st.price_usd).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`,
        priceRaw: Number(st.price_usd),
        hardCap: `$${Number(st.hard_cap_usd).toLocaleString()}`,
        hardCapRaw: Number(st.hard_cap_usd),
        raised: `$${dynamicRaisedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        raisedRaw: dynamicRaisedUsd,
        progress: st.hard_cap_usd > 0 ? Number(((dynamicRaisedUsd / st.hard_cap_usd) * 100).toFixed(1)) : 0,
        status: st.status,
        date: st.start_date && st.end_date 
          ? `${new Date(st.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(st.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : "TBD"
      };
    });

    return NextResponse.json({ ok: true, stages: formattedStages });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { stageId, isActive, priceUsd, hardCapUsd } = payload ?? {};
    if (!stageId) {
      return NextResponse.json(
        { ok: false, error: "stageId is required" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // If setting active, we must pause all other stages first to ensure single active stage
    if (isActive) {
      await supabase
        .from("presale_stages")
        .update({ status: "Paused" })
        .eq("status", "Active");
    }

    const { error } = await supabase
      .from("presale_stages")
      .update({
        status: isActive ? "Active" : "Paused",
        price_usd: priceUsd ?? null,
        hard_cap_usd: hardCapUsd ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", stageId);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message ?? "Unexpected server error" },
      { status: 500 }
    );
  }
}
