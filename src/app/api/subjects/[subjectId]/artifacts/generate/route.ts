import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateFramework } from "@/lib/ai/generate-framework";
import { generateCheatsheet } from "@/lib/ai/generate-cheatsheet";

type Params = { subjectId: string };

export async function POST(_req: Request, ctx: { params: Promise<Params> }) {
  const { subjectId } = await ctx.params;

  const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
  if (!subject) return NextResponse.json({ error: "学科不存在" }, { status: 404 });

  const chunks = await prisma.materialChunk.findMany({
    where: { material: { subjectId } },
    orderBy: [{ materialId: "asc" }, { chunkIndex: "asc" }],
    take: 200,
  });

  if (chunks.length === 0) {
    return NextResponse.json({ error: "没有可用解析内容，请先上传并解析资料" }, { status: 400 });
  }

  const chunkTexts = chunks.map((c) => c.content);

  const frameworkConcise = await generateFramework({
    subjectName: subject.name,
    chunks: chunkTexts,
    detail: "CONCISE",
  });
  const frameworkDetailed = await generateFramework({
    subjectName: subject.name,
    chunks: chunkTexts,
    detail: "DETAILED",
  });

  const cheatsheetConcise = await generateCheatsheet({
    subjectName: subject.name,
    chunks: chunkTexts,
    detail: "CONCISE",
  });
  const cheatsheetDetailed = await generateCheatsheet({
    subjectName: subject.name,
    chunks: chunkTexts,
    detail: "DETAILED",
  });

  await prisma.knowledgeArtifact.createMany({
    data: [
      {
        subjectId,
        type: "C1_FRAMEWORK",
        detailLevel: "CONCISE",
        contentJson: frameworkConcise,
      },
      {
        subjectId,
        type: "C1_FRAMEWORK",
        detailLevel: "DETAILED",
        contentJson: frameworkDetailed,
      },
      {
        subjectId,
        type: "C4_CHEATSHEET",
        detailLevel: "CONCISE",
        contentMd: cheatsheetConcise,
      },
      {
        subjectId,
        type: "C4_CHEATSHEET",
        detailLevel: "DETAILED",
        contentMd: cheatsheetDetailed,
      },
    ],
  });

  return NextResponse.json({ ok: true });
}
