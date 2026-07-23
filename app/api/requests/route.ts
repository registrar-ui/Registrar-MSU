import { NextRequest, NextResponse } from "next/server";

/**
 * PLACEHOLDER PERSISTENCE LAYER.
 *
 * This in-memory array exists only so the wizard has something to POST to
 * during development. It resets whenever the server restarts and is NOT
 * shared across serverless instances in production.
 *
 * Wire this up to your real database / queue before going live, e.g.:
 *   - Insert a row into a `student_requests` table (status: "pending_verification")
 *   - Notify the Registrar (email / dashboard) that a new request needs verification
 *
 * Per the product requirement, this route must never look up or validate the
 * submitted student details against any Student Records System — it only
 * accepts and stores the raw request for a human to verify later.
 */
type StoredRequest = {
  referenceNumber: string;
  submittedAt: string;
  status: "pending_verification";
  payload: unknown;
};

const submissions: StoredRequest[] = [];

function generateReferenceNumber() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `REQ-${year}-${random}`;
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const referenceNumber = generateReferenceNumber();
  submissions.push({
    referenceNumber,
    submittedAt: new Date().toISOString(),
    status: "pending_verification",
    payload,
  });

  return NextResponse.json({
    ok: true,
    referenceNumber,
    status: "pending_verification",
  });
}