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

export async function GET() {
  try {
    ensureTable();
    const db = getDb();

    const items = db
      .prepare(
        `SELECT id, name, phone, email, service, date, note, createdAt
         FROM appointments
         ORDER BY datetime(createdAt) DESC
         LIMIT 200`
      )
      .all();

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    console.error("Admin appointments list error:", e);
    return NextResponse.json({ ok: false, error: "Liste alınamadı." }, { status: 500 });
  }
}