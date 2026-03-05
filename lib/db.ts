import "server-only";
import Database from "better-sqlite3";

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

export function getDb() {
  if (!globalThis.__db) {
    globalThis.__db = new Database("dev.db");
    globalThis.__db.pragma("journal_mode = WAL");
  }
  return globalThis.__db;
}