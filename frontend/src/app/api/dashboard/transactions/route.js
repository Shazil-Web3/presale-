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

    // Fetch transactions for wallet, ordering by captured_at descending
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("tx_hash, network, payment_token, amount_paid, amount_paid_usd, brx_quantity, status, captured_at")
      .eq("wallet_address", wallet)
      .order("captured_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const formattedTransactions = transactions.map((tx) => ({
      hash: tx.tx_hash.slice(0, 6) + "..." + tx.tx_hash.slice(-4),
      fullHash: tx.tx_hash,
      network: tx.network === "BSC" ? "BNB Smart Chain" : "Ethereum",
      token: tx.payment_token,
      paid: tx.payment_token === "USDT" 
        ? `$${Number(tx.amount_paid_usd).toLocaleString()}` 
        : `${Number(tx.amount_paid).toLocaleString(undefined, { maximumFractionDigits: 4 })}`,
      rawAmount: Number(tx.amount_paid),
      amountUsd: Number(tx.amount_paid_usd),
      received: `${Number(tx.brx_quantity).toLocaleString()} BRX`,
      rawQty: Number(tx.brx_quantity),
      status: tx.status === "Success" ? "Confirmed" : tx.status,
      date: new Date(tx.captured_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json({ ok: true, transactions: formattedTransactions });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
