/**
 * Shared persistence contracts.
 *
 * The application talks to `Collection<T>` only. Two adapters implement it:
 *   - `FileAdapter`  — zero-config JSON store under `./.data` (default, local dev)
 *   - `MongoAdapter` — Mongoose-backed store (enabled by setting MONGODB_URI)
 *
 * Validation is owned by Zod at the API boundary (see `lib/schemas.ts`), so the
 * persistence layer stays intentionally thin and swappable.
 */

export type BaseDoc = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/** Supported query operators. Deliberately small — enough for this app's needs. */
export type FieldQuery =
  | string
  | number
  | boolean
  | null
  | { $in: Array<string | number> }
  | { $ne: string | number | boolean | null }
  | { $regex: string; $options?: string };

export type Query = Record<string, FieldQuery>;

export type FindOptions<T> = {
  sort?: { field: keyof T & string; dir: 1 | -1 };
  limit?: number;
  skip?: number;
};

export interface Collection<T extends BaseDoc> {
  readonly name: string;
  find(query?: Query, options?: FindOptions<T>): Promise<T[]>;
  findOne(query: Query): Promise<T | null>;
  get(id: string): Promise<T | null>;
  count(query?: Query): Promise<number>;
  create(data: Omit<T, keyof BaseDoc> & Partial<BaseDoc>): Promise<T>;
  createMany(rows: Array<Omit<T, keyof BaseDoc> & Partial<BaseDoc>>): Promise<T[]>;
  update(id: string, patch: Partial<Omit<T, "id" | "createdAt">>): Promise<T | null>;
  remove(id: string): Promise<boolean>;
  seedIfEmpty(rows: Array<Omit<T, keyof BaseDoc> & Partial<BaseDoc>>): Promise<number>;
}

export class DbError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "DbError";
  }
}
