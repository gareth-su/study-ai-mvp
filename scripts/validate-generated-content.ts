import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { FrameworkSchema, parseFrameworkJson } from "../src/lib/ai/framework-schema";

const generatedDir = path.join(process.cwd(), "data", "generated", "ysjrgj");

const MaterialInputSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  filePath: z.string().trim().min(1),
  mimeType: z.string().trim().min(1).nullable().optional(),
});

const ChunkInputSchema = z.object({
  materialId: z.string().trim().min(1),
  chunkIndex: z.number().int().nonnegative(),
  content: z.string().trim().min(1),
  tokenCount: z.number().int().nonnegative().optional(),
  sourcePage: z.number().int().positive().nullable().optional(),
  sourceSection: z.string().trim().min(1).nullable().optional(),
  contentType: z.string().trim().min(1).nullable().optional(),
});

const MaterialsInputSchema = z.array(MaterialInputSchema).min(1);
const ChunksInputSchema = z.array(ChunkInputSchema).min(1);

type ValidationResult = {
  materials: z.infer<typeof MaterialsInputSchema>;
  chunks: z.infer<typeof ChunksInputSchema>;
  conciseFramework: z.infer<typeof FrameworkSchema>;
  detailedFramework: z.infer<typeof FrameworkSchema>;
};

async function readJsonText(fileName: string) {
  return readFile(path.join(generatedDir, fileName), "utf8");
}

function formatZodError(error: z.ZodError) {
  return z.prettifyError(error);
}

async function parseJsonFile<T>(fileName: string, schema: z.ZodType<T>): Promise<T> {
  const raw = await readJsonText(fileName);
  const parsed = JSON.parse(raw) as unknown;
  return schema.parse(parsed);
}

export async function validateGeneratedContent(): Promise<ValidationResult> {
  const [materials, chunks, conciseRaw, detailedRaw] = await Promise.all([
    parseJsonFile("materials.json", MaterialsInputSchema),
    parseJsonFile("chunks.json", ChunksInputSchema),
    readJsonText("framework-concise.json"),
    readJsonText("framework-detailed.json"),
  ]);

  const materialIds = new Set(materials.map((material) => material.id));
  const unknownMaterialIds = chunks.map((chunk) => chunk.materialId).filter((materialId) => !materialIds.has(materialId));

  if (unknownMaterialIds.length > 0) {
    throw new Error(`chunks.json 引用了 materials.json 中不存在的 materialId：${[...new Set(unknownMaterialIds)].join("、")}`);
  }

  const conciseFramework = parseFrameworkJson(conciseRaw);
  const detailedFramework = parseFrameworkJson(detailedRaw);

  return {
    materials,
    chunks,
    conciseFramework,
    detailedFramework,
  };
}

async function main() {
  try {
    const result = await validateGeneratedContent();
    console.log("离线生成内容校验通过");
    console.log(`materials: ${result.materials.length}`);
    console.log(`chunks: ${result.chunks.length}`);
    console.log(`framework concise chapters: ${result.conciseFramework.chapters.length}`);
    console.log(`framework detailed chapters: ${result.detailedFramework.chapters.length}`);
  } catch (error) {
    console.error("离线生成内容校验失败");

    if (error instanceof z.ZodError) {
      console.error(formatZodError(error));
    } else if (error instanceof SyntaxError) {
      console.error(`JSON 解析失败：${error.message}`);
    } else {
      console.error(error instanceof Error ? error.message : error);
    }

    process.exitCode = 1;
  }
}

void main();
