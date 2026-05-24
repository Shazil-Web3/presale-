import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      transactionHash,
      walletAddress,
      paymentToken,
      network,
      brxQuantity,
      amountPaidUsd = null,
      stage = null,
    } = payload ?? {};

    const normalizedWallet = walletAddress?.trim().toLowerCase();
    const normalizedHash = transactionHash?.trim().toLowerCase();
    const qty = Number(brxQuantity);

    if (
      !normalizedWallet ||
      !normalizedHash ||
      !paymentToken ||
      !network ||
      Number.isNaN(qty) ||
      qty <= 0
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Required fields: transactionHash, walletAddress, paymentToken, network, brxQuantity (>0).",
        },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const timestamp = new Date().toISOString();

    const { error: investorError } = await supabase.from("investors").upsert(
      {
        wallet_address: normalizedWallet,
        latest_network: network,
        last_seen_at: timestamp,
      },
      { onConflict: "wallet_address" }
    );

    if (investorError) {
      return NextResponse.json(
        { ok: false, error: investorError.message },
        { status: 500 }
      );
    }

    const { data, error: txError } = await supabase
      .from("transactions")
      .insert({
        tx_hash: normalizedHash,
        wallet_address: normalizedWallet,
        payment_token: paymentToken,
        network,
        brx_quantity: qty,
        amount_paid_usd: amountPaidUsd,
        stage,
        captured_at: timestamp,
      })
      .select("id")
      .single();

    if (txError) {
      return NextResponse.json(
        { ok: false, error: txError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, transactionId: data.id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message ?? "Unexpected server error" },
      { status: 500 }
    );
  }
}
