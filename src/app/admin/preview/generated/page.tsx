import { readFile } from "node:fs/promises";
import path from "node:path";
import PreviewClient from "./PreviewClient";

type LoadResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

async function loadJsonFile(subDir: string, level: "concise" | "detailed"): Promise<LoadResult> {
  const filePath = path.join(
    process.cwd(),
    "data",
    "generated",
    "ysjrgj",
    subDir,
    `framework-${level}.json`,
  );

  try {
    const raw = await readFile(filePath, "utf8");
    JSON.parse(raw); // validate before passing to client
    return { ok: true, content: raw };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        ok: false,
        error: `framework-${level}.json 不是合法 JSON：${error.message}`,
      };
    }

    const isNotFound =
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT";

    if (isNotFound) {
      return {
        ok: false,
        error: `文件不存在：data/generated/ysjrgj/${subDir}/framework-${level}.json`,
      };
    }

    const message = error instanceof Error ? error.message : "读取文件失败";
    return { ok: false, error: message };
  }
}

export default async function PreviewGeneratedPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const defaultVariant = variant === "full" ? "full" : "sample";

  const [sampleConcise, sampleDetailed, fullConcise, fullDetailed] = await Promise.all([
    loadJsonFile("sample", "concise"),
    loadJsonFile("sample", "detailed"),
    loadJsonFile("full", "concise"),
    loadJsonFile("full", "detailed"),
  ]);

  return (
    <PreviewClient
      defaultVariant={defaultVariant}
      sampleConcise={sampleConcise}
      sampleDetailed={sampleDetailed}
      fullConcise={fullConcise}
      fullDetailed={fullDetailed}
    />
  );
}
