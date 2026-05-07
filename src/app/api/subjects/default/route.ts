import { NextResponse } from "next/server";
import { getOrCreateDefaultSubject } from "@/lib/db/default-subject";

export async function GET() {
  const subject = await getOrCreateDefaultSubject();
  return NextResponse.json({ subject });
}
