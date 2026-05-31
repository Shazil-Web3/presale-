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
      .from("transactions")
      .select("tx_hash, wallet_address, payment_token, amount_paid, amount_paid_usd, brx_quantity, network, status, captured_at");

    if (search) {
      // Postgres search on either tx_hash or wallet_address
      query = query.or(`tx_hash.ilike.%${search}%,wallet_address.ilike.%${search}%`);
    }

    if (status && status !== "All") {
      query = query.eq("status", status);
    }

    query = query.order("captured_at", { ascending: false });

    const { data: transactions, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const formattedTransactions = transactions.map((tx) => ({
      id: tx.tx_hash,
      hash: tx.tx_hash.slice(0, 6) + "..." + tx.tx_hash.slice(-4),
      fullHash: tx.tx_hash,
      wallet: tx.wallet_address,
      shortWallet: tx.wallet_address.slice(0, 6) + "..." + tx.wallet_address.slice(-4),
      token: tx.payment_token,
      amount: `${Number(tx.amount_paid).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${tx.payment_token}`,
      value: `$${Number(tx.amount_paid_usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      received: `${Number(tx.brx_quantity).toLocaleString()} BRX`,
      network: tx.network === "BSC" ? "BSC" : "ETH",
      status: tx.status === "Success" ? "Success" : tx.status,
      date: new Date(tx.captured_at).toISOString().replace("T", " ").substring(0, 19),
    }));

    return NextResponse.json({
      ok: true,
      transactions: formattedTransactions,
      totalCount: formattedTransactions.length,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint to update transaction verification states (Success/Failed)
export async function POST(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_STAGE_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { txHash, status } = payload ?? {};

    if (!txHash || !status) {
      return NextResponse.json(
        { ok: false, error: "Missing txHash or status." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Update status in the database
    // If set to Success, the database trigger handle_successful_transaction() will fire
    const { error } = await supabase
      .from("transactions")
      .update({
        status,
        confirmed_at: status === "Success" ? new Date().toISOString() : null,
      })
      .eq("tx_hash", txHash.toLowerCase());

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: `Transaction set to ${status} successfully.` });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
