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

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    ensureTable();
    const db = getDb();
    const { id } = await ctx.params;

    const info = db.prepare(`DELETE FROM appointments WHERE id = ?`).run(id);

    return NextResponse.json({ ok: true, deleted: info.changes });
  } catch (e) {
    console.error("Admin appointment delete error:", e);
    return NextResponse.json({ ok: false, error: "Silinemedi." }, { status: 500 });
  }
}