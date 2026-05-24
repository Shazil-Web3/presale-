import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

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
    const { error } = await supabase
      .from("presale_stages")
      .update({
        is_active: Boolean(isActive),
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
