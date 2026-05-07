import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getFixedCourseFramework } from "@/lib/ingestion/ingest-fixed-course";

type Params = { subjectId: string };

export async function GET(req: NextRequest, ctx: { params: Promise<Params> }) {
  const { subjectId } = await ctx.params;
  const level = req.nextUrl.searchParams.get("level") === "detailed" ? "DETAILED" : "CONCISE";

  try {
    const artifact = await prisma.knowledgeArtifact.findFirst({
      where: {
        subjectId,
        type: "C1_FRAMEWORK",
        detailLevel: level,
      },
      orderBy: { generatedAt: "desc" },
    });

    if (artifact) return NextResponse.json({ artifact });
  } catch {
    // Vercel demo can still render the fixed prebuilt framework if SQLite is unavailable.
  }

  return NextResponse.json({
    artifact: {
      contentJson: JSON.stringify(getFixedCourseFramework(level), null, 2),
    },
  });
}
