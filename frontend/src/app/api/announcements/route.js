import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: announcements, error } = await supabase
      .from("announcements")
      .select("title, tag, description, color, published_at")
      .eq("is_visible", true)
      .order("published_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const formattedAnnouncements = announcements.map((news) => ({
      title: news.title,
      tag: news.tag,
      description: news.description,
      color: news.color,
      date: new Date(news.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json({ ok: true, announcements: formattedAnnouncements });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
