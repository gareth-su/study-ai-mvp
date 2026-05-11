"use client";

import { useMemo, useState, type ReactNode } from "react";
import VisualBlockRenderer from "./VisualBlockRenderer";
import { buildLearningModules, type LearningModule } from "./buildLearningModules";
import LearningModuleSection from "./LearningModuleSection";
import ResourceIndex from "./ResourceIndex";

export type FrameworkNode = {
  name?: string;
  summary?: string;
  children?: FrameworkNode[];
};

export type FrameworkChapter = {
  chapterTitle?: string;
  sourceFile?: string;
  summary?: string;
  keyConcepts?: string[];
  nodes?: FrameworkNode[];
  visualBlocks?: unknown[];
};

export type FrameworkData = {
  title?: string;
  courseSummary?: string;
  chapters?: FrameworkChapter[];
  overallFramework?: {
    mainThread?: string;
    learningPath?: string[];
    crossChapterRelations?: Array<{ from?: string; to?: string; relation?: string }>;
    coreConceptMap?: Array<{ concept?: string; appearsIn?: string[]; importance?: string }>;
  };
};

type LearningMode = "concise" | "detailed";

type Props = {
  framework: FrameworkData;
  courseName: string;
  /** Show per-module match statistics (admin preview) */
  showDiagnostics?: boolean;
  mode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  toolbarExtra?: ReactNode;
  headerEyebrow?: string;
  headerTitle?: string;
  headerDescription?: ReactNode;
  debugDetails?: ReactNode;
};

const modeMeta: Record<LearningMode, { label: string; description: string }> = {
  concise: { label: "快速复习", description: "提纲版：抓主线和考点" },
  detailed: { label: "系统学习", description: "讲义版：完整理解和展开" },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function stripChapterPrefix(title?: string) {
  return (title ?? "未命名章节")
    .replace(/^第[一二三四五六七八九十百\d]+章[：:\s、.-]*/u, "")
    .replace(/^Chapter\s*\d+[：:\s、.-]*/iu, "")
    .trim();
}

function formatChapterNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function formatChapterTabLabel(chapter: FrameworkChapter, index: number) {
  return `${formatChapterNumber(index)} ${stripChapterPrefix(chapter.chapterTitle)}`;
}

function getBlockType(block: unknown): string {
  if (!block || typeof block !== "object" || !("type" in block)) return "";
  const type = (block as { type?: unknown }).type;
  return typeof type === "string" ? type : "";
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ChapterTabs({ chapters, activeIndex, onChange }: { chapters: FrameworkChapter[]; activeIndex: number; onChange: (index: number) => void }) {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-2xl gap-1.5 overflow-x-auto px-6 py-2.5 [scrollbar-width:thin]">
        {chapters.map((chapter, index) => (
          <button
            key={`${chapter.chapterTitle ?? "chapter"}-${index}`}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              activeIndex === index
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-transparent bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
            onClick={() => onChange(index)}
          >
            {formatChapterTabLabel(chapter, index)}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChapterGuide({ summary, keyConcepts, guideNodes }: { summary?: string; keyConcepts?: string[]; guideNodes: { name?: string; summary?: string }[] }) {
  if (!summary && !keyConcepts?.length && !guideNodes.length) return null;

  return (
    <section id="guide" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950">本章导读</h2>
        <p className="mt-1.5 text-sm leading-7 text-zinc-500">先看本章为什么学、怎么学，以及它在课程中的位置。</p>
      </div>

      <div className="space-y-4">
        {summary && (
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-xs font-semibold text-blue-700">章节总览</p>
            <p className="mt-1 text-sm leading-7 text-zinc-700">{summary}</p>
          </div>
        )}

        {guideNodes.length > 0 && (
          <div className="grid gap-3 xl:grid-cols-2">
            {guideNodes.map((node, index) => (
              <div key={`${node.name ?? "guide"}-${index}`} className="rounded-xl bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-500">{node.name}</p>
                {node.summary && <p className="mt-1 text-sm leading-7 text-zinc-700">{node.summary}</p>}
              </div>
            ))}
          </div>
        )}

        {keyConcepts && keyConcepts.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-zinc-500">本章关键词</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {keyConcepts.map((concept) => (
                <span key={concept} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ChapterReviewSection({ pitfalls, reviewPath }: { pitfalls: string[] | null; reviewPath: { name?: string; children?: { name?: string }[] } | null }) {
  if (!pitfalls && !reviewPath) return null;

  return (
    <section id="chapter-review" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950">本章整合</h2>
        <p className="mt-1.5 text-sm leading-7 text-zinc-500">易错提醒和复习路径。</p>
      </div>

      <div className="space-y-4">
        {pitfalls && pitfalls.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">易错点 / 易混点</p>
            <ul className="space-y-1">
              {pitfalls.map((item, i) => (
                <li key={`p-${i}`} className="flex gap-2 text-sm leading-6 text-zinc-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {reviewPath && reviewPath.children && reviewPath.children.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">复习路径</p>
            <ol className="space-y-1.5">
              {reviewPath.children.map((step, i) => (
                <li key={`r-${i}`} className="flex gap-2 text-sm leading-6 text-zinc-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                    {i + 1}
                  </span>
                  {step.name}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

function SupplementsSection({ blocks }: { blocks: unknown[] }) {
  if (blocks.length === 0) return null;

  // Group supplements by type
  const grouped: Record<string, unknown[]> = {};
  for (const block of blocks) {
    const type = getBlockType(block);
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(block);
  }

  const typeLabels: Record<string, string> = {
    formula_card: "补充公式",
    case_card: "补充案例",
    example_box: "补充例题",
    chart_explanation: "补充图表说明",
    payoff_chart: "补充收益图",
    line_chart: "补充趋势图",
    curve_chart: "补充曲线图",
    cashflow_diagram: "补充现金流图",
    decision_tree: "补充判断分支",
    timeline: "补充时间线",
    process_flow: "补充流程图",
    comparison_table: "补充对比表",
    data_table: "补充数据表",
    concept_map: "补充概念图",
    image: "补充图片",
  };

  return (
    <section id="supplements" className="scroll-mt-24 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950">补充材料</h2>
        <p className="mt-1.5 text-sm leading-7 text-zinc-500">
          以下内容未能匹配到具体学习模块{blocks.length > 1 ? `（共 ${blocks.length} 项）` : ""}。
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {typeLabels[type] ?? type}（{items.length}）
            </p>
            <VisualBlockRenderer blocks={items} showHeading={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function Sidebar({
  modules,
  chapter,
  mode,
  activeIndex,
  total,
}: {
  modules: LearningModule[];
  chapter: FrameworkChapter;
  mode: LearningMode;
  activeIndex: number;
  total: number;
}) {
  // Count blocks by type across all modules
  let formulaCount = 0;
  let exampleCount = 0;
  let caseCount = 0;
  let chartCount = 0;

  for (const mod of modules) {
    for (const block of mod.visualBlocks) {
      const type = getBlockType(block);
      if (type === "formula_card") formulaCount++;
      else if (type === "example_box") exampleCount++;
      else if (type === "case_card") caseCount++;
      else if (["payoff_chart", "line_chart", "curve_chart", "chart_explanation", "cashflow_diagram", "decision_tree", "timeline", "process_flow"].includes(type)) chartCount++;
    }
  }

  return (
    <aside className="sticky top-20 self-start rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-xs font-medium text-zinc-500">第 {activeIndex + 1} / {total} 章</p>
      <h3 className="mt-1.5 text-base font-semibold leading-7 text-zinc-950">{stripChapterPrefix(chapter.chapterTitle)}</h3>
      <p className="mt-1 text-xs text-zinc-500">当前模式：{modeMeta[mode].label}</p>

      {/* Module navigation */}
      {modules.length > 0 && (
        <div className="mt-4 border-t border-zinc-100 pt-3">
          <p className="px-3 text-xs font-semibold text-zinc-400">模块导航</p>
          <div className="mt-2 space-y-1 text-sm">
            <a href="#guide" className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950">
              本章导读
            </a>
            {modules.map((mod, i) => {
              const blockCount = mod.visualBlocks.length;
              const hasConcepts = mod.conceptItems.length > 0;
              return (
                <a
                  key={mod.id}
                  href={`#${mod.id}`}
                  className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  <span className="mr-1.5 text-xs text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
                  {mod.title}
                  {(hasConcepts || blockCount > 0) && (
                    <span className="ml-2 text-xs text-zinc-400">
                      {hasConcepts ? `${mod.conceptItems.length} 知识点` : ""}
                      {hasConcepts && blockCount > 0 ? " · " : ""}
                      {blockCount > 0 ? `${blockCount} 资源` : ""}
                    </span>
                  )}
                </a>
              );
            })}
            <a href="#chapter-review" className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950">
              本章整合
            </a>
            <a href="#resource-index" className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950">
              资源索引
            </a>
          </div>
        </div>
      )}

      {/* Resource count */}
      {(formulaCount > 0 || exampleCount > 0 || caseCount > 0 || chartCount > 0) && (
        <div className="mt-4 grid grid-cols-4 gap-1.5 border-t border-zinc-100 pt-3 text-center">
          {formulaCount > 0 && (
            <div className="rounded-lg bg-violet-50 px-1 py-1.5">
              <p className="text-sm font-semibold text-violet-700">{formulaCount}</p>
              <p className="text-[11px] text-violet-600">公式</p>
            </div>
          )}
          {exampleCount > 0 && (
            <div className="rounded-lg bg-blue-50 px-1 py-1.5">
              <p className="text-sm font-semibold text-blue-700">{exampleCount}</p>
              <p className="text-[11px] text-blue-600">例题</p>
            </div>
          )}
          {caseCount > 0 && (
            <div className="rounded-lg bg-indigo-50 px-1 py-1.5">
              <p className="text-sm font-semibold text-indigo-700">{caseCount}</p>
              <p className="text-[11px] text-indigo-600">案例</p>
            </div>
          )}
          {chartCount > 0 && (
            <div className="rounded-lg bg-emerald-50 px-1 py-1.5">
              <p className="text-sm font-semibold text-emerald-700">{chartCount}</p>
              <p className="text-[11px] text-emerald-600">图表</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function FrameworkLearningView({
  framework,
  courseName,
  showDiagnostics = false,
  mode,
  onModeChange,
  toolbarExtra,
  headerEyebrow = "课程学习页",
  headerTitle,
  headerDescription,
  debugDetails,
}: Props) {
  const chapters = framework.chapters ?? [];
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = chapters[Math.min(activeChapterIndex, Math.max(chapters.length - 1, 0))];

  const result = useMemo(
    () => (activeChapter ? buildLearningModules(activeChapter) : null),
    [activeChapter],
  );

  const previousChapter = activeChapterIndex > 0 ? chapters[activeChapterIndex - 1] : null;
  const nextChapter = activeChapterIndex < chapters.length - 1 ? chapters[activeChapterIndex + 1] : null;

  if (!activeChapter) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
          <section className="rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="text-sm text-zinc-500">暂无章节内容。</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 px-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="font-medium text-zinc-700">{courseName}</span>
              <span className="text-zinc-300">/</span>
              <span>{headerEyebrow}</span>
            </div>
            <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-zinc-950">
              {stripChapterPrefix(activeChapter.chapterTitle) || headerTitle || framework.title || "课程知识框架"}
            </h1>
            {headerDescription && (
              <p className="mt-1.5 max-w-4xl text-sm leading-6 text-zinc-500">{headerDescription}</p>
            )}
            <details className="mt-3 max-w-4xl rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-700">课程总览</summary>
              <div className="mt-2 space-y-3 text-sm leading-7 text-zinc-600">
                {framework.overallFramework?.mainThread && <p>{framework.overallFramework.mainThread}</p>}
                {!framework.overallFramework?.mainThread && framework.courseSummary && <p>{framework.courseSummary}</p>}
                {framework.overallFramework?.learningPath?.length && (
                  <ol className="space-y-1.5">
                    {framework.overallFramework.learningPath.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-2">
                        <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-white text-center text-xs font-semibold leading-5 text-zinc-700">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </details>
            {debugDetails}
          </div>

          <div className="flex shrink-0 items-end gap-3">
            {toolbarExtra}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-1">
              <div className="flex gap-1">
                {(["concise", "detailed"] as const).map((item) => (
                  <button
                    key={item}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
                      mode === item ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                    onClick={() => onModeChange(item)}
                  >
                    <span className="block font-semibold">{modeMeta[item].label}</span>
                    <span className="block text-[11px] text-zinc-500">{modeMeta[item].description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChapterTabs chapters={chapters} activeIndex={activeChapterIndex} onChange={setActiveChapterIndex} />

      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-[minmax(0,1fr)_300px] gap-6 px-6 py-5">
        {/* ── Content ── */}
        <div className="min-w-0 space-y-5">
          {/* Chapter guide */}
          <ChapterGuide
            summary={result?.guide.summary}
            keyConcepts={result?.guide.keyConcepts}
            guideNodes={result?.guide.guideNodes ?? []}
          />

          {/* Learning modules */}
          {result?.modules.map((mod) => (
            <LearningModuleSection key={mod.id} module={mod} />
          ))}

          {/* Chapter review (pitfalls + review path) */}
          <ChapterReviewSection
            pitfalls={result?.chapterReview.pitfalls ?? null}
            reviewPath={result?.chapterReview.reviewPath ?? null}
          />

          {/* Resource index */}
          {result && <ResourceIndex modules={result.modules} />}

          {/* Supplements (unmatched content) */}
          {result && <SupplementsSection blocks={result.supplements} />}

          {/* Diagnostics (admin preview only) */}
          {showDiagnostics && result && (
            <section className="scroll-mt-24 rounded-2xl border border-dashed border-amber-200 bg-amber-50/40 p-5">
              <div className="mb-3">
                <h2 className="text-base font-semibold tracking-tight text-amber-900">匹配诊断</h2>
                <p className="mt-1 text-sm text-amber-700">
                  模块数 {result.stats.moduleCount}，visualBlocks 总数 {result.stats.totalBlocks}，
                  已匹配 {result.stats.matchedBlocks}，未匹配 {result.stats.unmatchedBlocks}（{result.stats.unmatchedRatio}）
                </p>
              </div>
              {result.moduleBlockCounts.length > 0 && (
                <div className="space-y-1 text-sm text-amber-800">
                  {result.modules.map((mod, i) => (
                    <div key={mod.id} className="flex justify-between gap-4">
                      <span className="truncate">{String(i + 1).padStart(2, "0")} {mod.title}</span>
                      <span className="shrink-0 font-mono text-xs">
                        {result.moduleBlockCounts[i] ?? 0} 资源{mod.conceptItems.length > 0 ? ` · ${mod.conceptItems.length} 知识点` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Chapter navigation */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3">
              <button
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!previousChapter}
                onClick={() => setActiveChapterIndex((value) => Math.max(0, value - 1))}
              >
                上一章{previousChapter ? `：${stripChapterPrefix(previousChapter.chapterTitle)}` : ""}
              </button>
              <p className="text-sm font-medium text-zinc-500">
                第 {activeChapterIndex + 1} / {chapters.length} 章
              </p>
              <button
                className="rounded-lg border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!nextChapter}
                onClick={() => setActiveChapterIndex((value) => Math.min(chapters.length - 1, value + 1))}
              >
                下一章{nextChapter ? `：${stripChapterPrefix(nextChapter.chapterTitle)}` : ""}
              </button>
            </div>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <Sidebar
          modules={result?.modules ?? []}
          chapter={activeChapter}
          mode={mode}
          activeIndex={activeChapterIndex}
          total={chapters.length}
        />
      </div>
    </main>
  );
}
