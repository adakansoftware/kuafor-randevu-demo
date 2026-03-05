import "server-only";
import Database from "better-sqlite3";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

function getDbPath() {
  // Vercel'de yazılabilir tek güvenli alan: /tmp
  if (process.env.VERCEL) return path.join("/tmp", "dev.db");
  // Local
  return "dev.db";
}

export function getDb() {
  if (!globalThis.__db) {
    const dbPath = getDbPath();
    globalThis.__db = new Database(dbPath);
    globalThis.__db.pragma("journal_mode = WAL");
  }
  return globalThis.__db;
}