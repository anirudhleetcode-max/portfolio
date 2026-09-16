import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/schemas";
import { messageReference } from "@/lib/utils";

export const runtime = "nodejs";

/**
 * The browser validates with `contactSchema` before it ever gets here; this
 * re-parses the body regardless, because a request that skipped the form must
 * be held to exactly the same rules.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { company, ...rest } = parsed.data;

  try {
    const record = await db.messages.create({
      reference: messageReference(),
      ...rest,
      ...(company ? { company } : {}),
      status: "new",
    });
    return NextResponse.json({ reference: record.reference, id: record.id }, { status: 201 });
  } catch (error) {
    console.error("[contact] create failed", error);
    return NextResponse.json(
      { error: "Your message could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
