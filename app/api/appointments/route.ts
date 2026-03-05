export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

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

export async function POST(req: Request) {
  try {
    ensureTable();
    const db = getDb();
    const body = await req.json().catch(() => ({}));

    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const email = body?.email ? String(body.email).trim() : null;
    const service = body?.service ? String(body.service).trim() : null;
    const note = body?.note ? String(body.note).trim() : null;

    const dateStr = String(body?.date ?? "").trim(); // "YYYY-MM-DDTHH:mm:00"
    const date = new Date(dateStr);

    if (!name || !phone || Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Eksik veya hatalı alanlar (name/phone/date)." },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO appointments (id, name, phone, email, service, date, note, createdAt)
      VALUES (@id, @name, @phone, @email, @service, @date, @note, @createdAt)
    `).run({
      id,
      name,
      phone,
      email,
      service,
      date: date.toISOString(),
      note,
      createdAt,
    });

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("Appointment API Error:", error);
    return NextResponse.json({ error: "Randevu oluşturulamadı." }, { status: 500 });
  }
}