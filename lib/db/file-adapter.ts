import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { applyOptions, matchesQuery } from "./match";
import { DbError, type BaseDoc, type Collection, type FindOptions, type Query } from "./types";

/**
 * Where the JSON store lives.
 *
 * Locally that is `./.data` beside the project. On a serverless host the
 * deployment bundle is read-only, so writing there fails with EROFS/EACCES and
 * every form on the site would return 500. When the preferred directory is not
 * writable the store falls back to the platform temp directory, which is
 * writable but per-instance and wiped between cold starts — a demo fallback,
 * not storage. Set `MONGODB_URI` for a deployment whose data must survive.
 */
const PREFERRED_DIR = process.env.DATA_DIR?.trim() || path.join(process.cwd(), ".data");
const FALLBACK_DIR = path.join(os.tmpdir(), "portfolio-suite-data");

let resolvedDir: Promise<string> | null = null;

function dataDir(): Promise<string> {
  if (!resolvedDir) {
    resolvedDir = (async () => {
      try {
        await fs.mkdir(PREFERRED_DIR, { recursive: true });
        await fs.access(PREFERRED_DIR, fs.constants.W_OK);
        return PREFERRED_DIR;
      } catch {
        await fs.mkdir(FALLBACK_DIR, { recursive: true });
        console.warn(
          `[db] ${PREFERRED_DIR} is not writable, so this instance is using the ` +
            `ephemeral store at ${FALLBACK_DIR}. Data will not survive a cold start. ` +
            `Set MONGODB_URI for durable storage.`,
        );
        return FALLBACK_DIR;
      }
    })();
  }
  return resolvedDir;
}

/** Serialises writes per file so concurrent route handlers cannot interleave. */
const writeLocks = new Map<string, Promise<unknown>>();

async function withLock<R>(key: string, fn: () => Promise<R>): Promise<R> {
  const previous = writeLocks.get(key) ?? Promise.resolve();
  const run = previous.then(fn, fn);
  writeLocks.set(
    key,
    run.catch(() => undefined),
  );
  return run;
}

async function readFile<T>(name: string): Promise<T[]> {
  const file = path.join(await dataDir(), `${name}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw new DbError(`Could not read collection "${name}"`, error);
  }
}

async function writeFile<T>(name: string, rows: T[]): Promise<void> {
  const dir = await dataDir();
  const file = path.join(dir, `${name}.json`);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(`${file}.tmp`, JSON.stringify(rows, null, 2), "utf8");
    await fs.rename(`${file}.tmp`, file);
  } catch (error) {
    throw new DbError(`Could not write collection "${name}"`, error);
  }
}

function stamp<T extends BaseDoc>(data: Omit<T, keyof BaseDoc> & Partial<BaseDoc>): T {
  const now = new Date().toISOString();
  return {
    ...(data as object),
    id: data.id ?? randomUUID(),
    createdAt: data.createdAt ?? now,
    updatedAt: now,
  } as T;
}

export function createFileCollection<T extends BaseDoc>(name: string): Collection<T> {
  return {
    name,

    async find(query: Query = {}, options: FindOptions<T> = {}) {
      const rows = await readFile<T>(name);
      const filtered = rows.filter((row) => matchesQuery(row as Record<string, unknown>, query));
      return applyOptions(filtered as Record<string, unknown>[], options as never) as T[];
    },

    async findOne(query: Query) {
      const rows = await this.find(query, { limit: 1 });
      return rows[0] ?? null;
    },

    async get(id: string) {
      const rows = await readFile<T>(name);
      return rows.find((row) => row.id === id) ?? null;
    },

    async count(query: Query = {}) {
      const rows = await readFile<T>(name);
      return rows.filter((row) => matchesQuery(row as Record<string, unknown>, query)).length;
    },

    async create(data) {
      return withLock(name, async () => {
        const rows = await readFile<T>(name);
        const doc = stamp<T>(data);
        rows.push(doc);
        await writeFile(name, rows);
        return doc;
      });
    },

    async createMany(input) {
      return withLock(name, async () => {
        const rows = await readFile<T>(name);
        const docs = input.map((item) => stamp<T>(item));
        await writeFile(name, [...rows, ...docs]);
        return docs;
      });
    },

    async update(id, patch) {
      return withLock(name, async () => {
        const rows = await readFile<T>(name);
        const index = rows.findIndex((row) => row.id === id);
        if (index === -1) return null;
        const next = {
          ...rows[index],
          ...patch,
          id,
          updatedAt: new Date().toISOString(),
        } as T;
        rows[index] = next;
        await writeFile(name, rows);
        return next;
      });
    },

    async remove(id) {
      return withLock(name, async () => {
        const rows = await readFile<T>(name);
        const next = rows.filter((row) => row.id !== id);
        if (next.length === rows.length) return false;
        await writeFile(name, next);
        return true;
      });
    },

    async seedIfEmpty(input) {
      return withLock(name, async () => {
        const rows = await readFile<T>(name);
        if (rows.length > 0) return 0;
        const docs = input.map((item) => stamp<T>(item));
        await writeFile(name, docs);
        return docs.length;
      });
    },
  };
}
