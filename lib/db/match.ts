import type { FieldQuery, FindOptions, Query } from "./types";

/** Evaluate a single field query against a document value. */
function matchField(value: unknown, condition: FieldQuery): boolean {
  if (condition !== null && typeof condition === "object") {
    if ("$in" in condition) {
      return condition.$in.some((candidate) => candidate === value);
    }
    if ("$ne" in condition) {
      return value !== condition.$ne;
    }
    if ("$regex" in condition) {
      const flags = condition.$options ?? "";
      return new RegExp(condition.$regex, flags).test(String(value ?? ""));
    }
    return false;
  }
  return value === condition;
}

/**
 * Resolves a possibly-dotted field path, e.g. "payment.razorpayOrderId".
 * MongoDB understands these natively; the file adapter needs this to match.
 */
function getPath(doc: Record<string, unknown>, path: string): unknown {
  if (!path.includes(".")) return doc[path];
  return path.split(".").reduce<unknown>((value, key) => {
    if (value === null || typeof value !== "object") return undefined;
    return (value as Record<string, unknown>)[key];
  }, doc);
}

export function matchesQuery(doc: Record<string, unknown>, query: Query = {}): boolean {
  return Object.entries(query).every(([field, condition]) =>
    matchField(getPath(doc, field), condition),
  );
}

export function applyOptions<T extends Record<string, unknown>>(
  rows: T[],
  options: FindOptions<T> = {},
): T[] {
  let out = rows;
  if (options.sort) {
    const { field, dir } = options.sort;
    out = [...out].sort((a, b) => {
      const av = a[field] as string | number | undefined;
      const bv = b[field] as string | number | undefined;
      if (av === bv) return 0;
      if (av === undefined || av === null) return 1;
      if (bv === undefined || bv === null) return -1;
      return (av < bv ? -1 : 1) * dir;
    });
  }
  const skip = options.skip ?? 0;
  if (skip) out = out.slice(skip);
  if (options.limit !== undefined) out = out.slice(0, options.limit);
  return out;
}
