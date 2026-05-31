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

    let query = supabase
      .from("transactions")
      .select("tx_hash, wallet_address, brx_quantity, status, captured_at");

    if (search) {
      query = query.ilike("wallet_address", `%${search}%`);
    }

    query = query.order("captured_at", { ascending: false });

    const { data: txs, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const totalDistributed = txs
      .filter((tx) => tx.status === "Success")
      .reduce((sum, r) => sum + Number(r.brx_quantity || 0), 0);

    const totalPending = txs
      .filter((tx) => tx.status === "Pending")
      .reduce((sum, r) => sum + Number(r.brx_quantity || 0), 0);

    const formattedAllocations = txs.map((tx) => ({
      id: tx.tx_hash,
      wallet: tx.wallet_address,
      amount: Number(tx.brx_quantity).toLocaleString(),
      status: tx.status === "Success" ? "Distributed" : tx.status === "Failed" ? "Failed" : "Pending",
      date: new Date(tx.captured_at).toISOString().substring(0, 10),
    }));

    return NextResponse.json({
      ok: true,
      totalDistributed: `${totalDistributed.toLocaleString()} BRX`,
      totalPending: `${totalPending.toLocaleString()} BRX`,
      allocations: formattedAllocations,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
