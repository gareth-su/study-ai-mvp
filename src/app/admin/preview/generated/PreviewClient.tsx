"use client";

import FrameworkLearningView, { type FrameworkData } from "@/components/framework/FrameworkLearningView";
import { useMemo, useState } from "react";

type LoadResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

type Variant = "sample" | "full";
type Level = "concise" | "detailed";

type Props = {
  defaultVariant: Variant;
  sampleConcise: LoadResult;
  sampleDetailed: LoadResult;
  fullConcise: LoadResult;
  fullDetailed: LoadResult;
};

const variantMeta: Record<Variant, { label: string; description: string; path: string }> = {
  sample: {
    label: "样例内容",
    description: "用于快速检查结构与视觉效果",
    path: "data/generated/ysjrgj/sample/",
  },
  full: {
    label: "完整课程",
    description: "整门课离线生成结果",
    path: "data/generated/ysjrgj/full/",
  },
};

function parseFramework(result: LoadResult): FrameworkData | null {
  if (!result.ok) return null;
  try {
    return JSON.parse(result.content) as FrameworkData;
  } catch {
    return null;
  }
}

export default function PreviewClient({
  defaultVariant,
  sampleConcise,
  sampleDetailed,
  fullConcise,
  fullDetailed,
}: Props) {
  const [variant, setVariant] = useState<Variant>(defaultVariant);
  const [level, setLevel] = useState<Level>("detailed");

  const results: Record<Variant, { concise: LoadResult; detailed: LoadResult }> = {
    sample: { concise: sampleConcise, detailed: sampleDetailed },
    full: { concise: fullConcise, detailed: fullDetailed },
  };

  const result = results[variant][level];
  const framework = useMemo(() => parseFramework(result), [result]);

  const toolbarExtra = (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 shadow-sm">
      <div className="mb-1 px-2 text-xs font-medium text-zinc-500">数据范围</div>
      <div className="flex gap-1">
        {(["sample", "full"] as const).map((item) => (
          <button
            key={item}
            className={`rounded-xl px-4 py-2 text-left text-sm transition ${variant === item ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}
            onClick={() => setVariant(item)}
          >
            <span className="block font-semibold">{variantMeta[item].label}</span>
            <span className="block text-xs text-zinc-500">{variantMeta[item].description}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const debugDetails = (
    <details className="mt-4 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-amber-900">调试信息</summary>
      <div className="mt-3 space-y-2 text-sm leading-6 text-amber-900">
        <p>当前范围：{variantMeta[variant].label}</p>
        <p>读取目录：<code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-xs">{variantMeta[variant].path}</code></p>
        <p>当前文件：<code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-xs">framework-{level}.json</code></p>
        <p>该页面只用于内容预览，不会写入数据库。</p>
      </div>
    </details>
  );

  if (!result.ok) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
          <p className="font-semibold">预览失败</p>
          <p className="mt-2">{result.error}</p>
        </section>
      </main>
    );
  }

  if (!framework) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
          <p className="font-semibold">预览失败</p>
          <p className="mt-2">当前内容不是合法 JSON。</p>
        </section>
      </main>
    );
  }

  return (
    <FrameworkLearningView
      framework={framework}
      courseName="衍生金融工具"
      mode={level}
      onModeChange={setLevel}
      toolbarExtra={toolbarExtra}
      headerEyebrow="内容预览"
      headerTitle="课程内容预览"
      headerDescription={framework.courseSummary ?? "预览课程知识框架、章节内容、公式、案例和图表的学习页效果。"}
      debugDetails={debugDetails}
    />
  );
}
