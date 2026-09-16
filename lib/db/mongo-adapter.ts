import mongoose, { Schema, type Model } from "mongoose";
import { DbError, type BaseDoc, type Collection, type FindOptions, type Query } from "./types";

declare global {
  // Cached across hot reloads in development so we never open duplicate pools.
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

function connect(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new DbError("MONGODB_URI is not configured");
  if (!global.__mongooseConn) {
    global.__mongooseConn = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined,
      serverSelectionTimeoutMS: 8000,
    });
  }
  return global.__mongooseConn;
}

const registry = new Map<string, Model<Record<string, unknown>>>();

function getModel(name: string, definition: Record<string, unknown>) {
  const existing = registry.get(name);
  if (existing) return existing;
  const schema = new Schema(definition as never, {
    timestamps: true,
    versionKey: false,
    strict: true,
  });
  schema.set("toJSON", {
    virtuals: true,
    transform(_doc, ret: Record<string, unknown>) {
      ret.id = String(ret._id);
      delete ret._id;
      ret.createdAt = new Date(ret.createdAt as string).toISOString();
      ret.updatedAt = new Date(ret.updatedAt as string).toISOString();
      return ret;
    },
  });
  const model = (mongoose.models[name] ??
    mongoose.model(name, schema)) as Model<Record<string, unknown>>;
  registry.set(name, model);
  return model;
}

function toPlain<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

/**
 * Mongoose-backed collection. `definition` is a standard Mongoose path map,
 * so each collection keeps a real, typed schema in the database.
 */
export function createMongoCollection<T extends BaseDoc>(
  name: string,
  definition: Record<string, unknown>,
): Collection<T> {
  const model = () => getModel(name, definition);

  return {
    name,

    async find(query: Query = {}, options: FindOptions<T> = {}) {
      await connect();
      let cursor = model().find(query as never);
      if (options.sort) cursor = cursor.sort({ [options.sort.field]: options.sort.dir });
      if (options.skip) cursor = cursor.skip(options.skip);
      if (options.limit !== undefined) cursor = cursor.limit(options.limit);
      return toPlain<T[]>(await cursor.exec());
    },

    async findOne(query: Query) {
      await connect();
      const doc = await model().findOne(query as never).exec();
      return doc ? toPlain<T>(doc) : null;
    },

    async get(id: string) {
      await connect();
      if (!mongoose.isValidObjectId(id)) return null;
      const doc = await model().findById(id).exec();
      return doc ? toPlain<T>(doc) : null;
    },

    async count(query: Query = {}) {
      await connect();
      return model().countDocuments(query as never).exec();
    },

    async create(data) {
      await connect();
      const doc = await model().create(data as never);
      return toPlain<T>(doc);
    },

    async createMany(rows) {
      await connect();
      const docs = await model().insertMany(rows as never[]);
      return toPlain<T[]>(docs);
    },

    async update(id, patch) {
      await connect();
      if (!mongoose.isValidObjectId(id)) return null;
      const doc = await model()
        .findByIdAndUpdate(id, patch as never, { new: true, runValidators: true })
        .exec();
      return doc ? toPlain<T>(doc) : null;
    },

    async remove(id) {
      await connect();
      if (!mongoose.isValidObjectId(id)) return false;
      const res = await model().findByIdAndDelete(id).exec();
      return Boolean(res);
    },

    async seedIfEmpty(rows) {
      await connect();
      const existing = await model().estimatedDocumentCount().exec();
      if (existing > 0) return 0;
      const docs = await model().insertMany(rows as never[]);
      return docs.length;
    },
  };
}
