export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function ensureTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service TEXT,
      date TEXT NOT NULL,
      note TEXT,
      createdAt TEXT NOT NULL
    );
  `);
}

export async function GET(req: Request) {
  try {
    ensureTable();
    const db = getDb();

    const url = new URL(req.url);
    const day = (url.searchParams.get("date") || "").trim(); // "YYYY-MM-DD"

    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      return NextResponse.json({ ok: false, error: "Geçersiz tarih" }, { status: 400 });
    }

    const start = `${day}T00:00:00.000Z`;
    const end = `${day}T23:59:59.999Z`;

    const rows = db
      .prepare(
        `SELECT date FROM appointments
         WHERE date >= ? AND date <= ?
         ORDER BY date ASC`
      )
      .all(start, end) as { date: string }[];

    // "HH:mm" listesi
    const bookedTimes = rows.map((r) => {
      const d = new Date(r.date);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    });

    return NextResponse.json({ ok: true, bookedTimes });
  } catch (e) {
    console.error("Slots API Error:", e);
    return NextResponse.json({ ok: false, error: "Saatler alınamadı" }, { status: 500 });
  }
}