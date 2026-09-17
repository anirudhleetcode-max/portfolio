import { createFileCollection } from "./file-adapter";
import { createMongoCollection } from "./mongo-adapter";
import type { BaseDoc, Collection } from "./types";

export type { Collection } from "./types";
export { DbError } from "./types";

/** A message submitted through the contact form. */
export type MessageDoc = BaseDoc & {
  reference: string;
  name: string;
  email: string;
  company?: string;
  /** Optional: the contact form no longer collects these. */
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "read" | "replied";
};

const messagePaths = {
  reference: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  company: { type: String },
  projectType: { type: String, index: true },
  budget: { type: String },
  timeline: { type: String },
  message: { type: String, required: true },
  status: { type: String, required: true, default: "new", index: true },
};

export const usingMongo = Boolean(process.env.MONGODB_URI);

function collection<T extends BaseDoc>(name: string, paths: Record<string, unknown>): Collection<T> {
  return usingMongo ? createMongoCollection<T>(name, paths) : createFileCollection<T>(name);
}

export const db = {
  messages: collection<MessageDoc>("messages", messagePaths),
};

export const backendName = usingMongo ? "MongoDB (Mongoose)" : "JSON file store (./.data)";
