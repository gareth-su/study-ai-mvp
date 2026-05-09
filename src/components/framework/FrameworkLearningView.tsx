"use client";

import { useMemo, useState, type ReactNode } from "react";
import VisualBlockRenderer from "./VisualBlockRenderer";

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
  mode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  toolbarExtra?: ReactNode;
  headerEyebrow?: string;
  headerTitle?: string;
  headerDescription?: ReactNode;
  debugDetails?: ReactNode;
};

type SectionKey = "concept" | "formula" | "case" | "diagram" | "summary";
type SectionId = "guide" | "concepts" | "formulas" | "cases" | "diagrams" | "summary";

type VisualBlockGroups = Record<SectionKey, unknown[]>;

const modeMeta: Record<LearningMode, { label: string; description: string }> = {
  concise: { label: "快速复习", description: "提纲版：抓主线和考点" },
  detailed: { label: "系统学习", description: "讲义版：完整理解和展开" },
};

const blockSectionMap: Record<string, SectionKey> = {
  concept_map: "concept",
  comparison_table: "concept",
  formula_card: "formula",
  data_table: "formula",
  case_card: "case",
  example_box: "case",
  process_flow: "diagram",
  chart_explanation: "diagram",
  payoff_chart: "diagram",
  line_chart: "diagram",
  curve_chart: "diagram",
  cashflow_diagram: "diagram",
  decision_tree: "diagram",
  timeline: "diagram",
  image: "diagram",
};

const guideNodePatterns = ["章节总览", "一句话定位", "课程作用", "为什么", "学习主线", "主线", "核心机制", "学习建议", "本章定位"];
const importantTerms = ["互换", "期权", "期货", "远期", "套利", "对冲", "保证金", "现金流", "利率", "货币", "基差", "定价", "收益", "风险", "做市", "清算", "信用", "合约", "价格", "策略", "执行", "本金", "债券", "股指", "远期价格", "期货价格"];

function getBlockType(block: unknown) {
  if (!block || typeof block !== "object" || !("type" in block)) return "";
  const type = (block as { type?: unknown }).type;
  return typeof type === "string" ? type : "";
}

function getBlockText(block: unknown) {
  if (!block || typeof block !== "object") return "";
  const candidate = block as { title?: unknown; description?: unknown };
  return [candidate.title, candidate.description].filter((item): item is string => typeof item === "string").join(" ");
}

function getNodeText(node: FrameworkNode) {
  return [node.name, node.summary].filter(Boolean).join(" ");
}

function normalizeText(text: string) {
  return text.toLowerCase().replace(/[\s，。、《》【】（）()：:；;,.\-_/\\]+/g, " ");
}

function extractKeywords(text: string) {
  const normalized = normalizeText(text);
  const keywords = new Set<string>();

  for (const term of importantTerms) {
    if (normalized.includes(term.toLowerCase())) keywords.add(term);
  }

  for (const token of normalized.split(" ")) {
    if (/^[a-zA-Z][a-zA-Z0-9_+-]{2,}$/.test(token)) keywords.add(token);
    if (/^[一-龥]{2,6}$/.test(token) && importantTerms.some((term) => token.includes(term) || term.includes(token))) keywords.add(token);
  }

  return [...keywords];
}

function isGuideNode(node: FrameworkNode) {
  const name = node.name ?? "";
  const summary = node.summary ?? "";
  const text = `${name} ${summary}`;
  return guideNodePatterns.some((pattern) => text.includes(pattern));
}

function flattenNodes(nodes: FrameworkNode[] | undefined, limit = 12) {
  const result: FrameworkNode[] = [];

  function visit(items: FrameworkNode[] | undefined) {
    for (const item of items ?? []) {
      if (result.length >= limit) return;
      result.push(item);
      visit(item.children);
    }
  }

  visit(nodes);
  return result;
}

function splitGuideAndConceptNodes(nodes: FrameworkNode[] | undefined) {
  const flattened = flattenNodes(nodes, 16);
  const guideNodes = flattened.filter(isGuideNode).slice(0, 5);
  const conceptNodes = flattened.filter((node) => !isGuideNode(node)).slice(0, 8);
  return { guideNodes, conceptNodes };
}

function matchBlockToNode(block: unknown, nodes: FrameworkNode[]) {
  const blockKeywords = extractKeywords(getBlockText(block));
  if (blockKeywords.length < 2) return null;

  let best: { node: FrameworkNode; score: number } | null = null;

  for (const node of nodes) {
    const nodeKeywords = extractKeywords(getNodeText(node));
    const score = blockKeywords.filter((keyword) => nodeKeywords.includes(keyword)).length;
    if (score >= 2 && (!best || score > best.score)) {
      best = { node, score };
    }
  }

  return best?.node ?? null;
}

function distributeVisualBlocks(blocks: unknown[] | undefined, nodes: FrameworkNode[]) {
  const grouped: VisualBlockGroups = {
    concept: [],
    formula: [],
    case: [],
    diagram: [],
    summary: [],
  };
  const attached = new Map<FrameworkNode, unknown[]>();

  for (const block of blocks ?? []) {
    const matchedNode = matchBlockToNode(block, nodes);
    if (matchedNode) {
      const current = attached.get(matchedNode) ?? [];
      current.push(block);
      attached.set(matchedNode, current);
      continue;
    }

    const section = blockSectionMap[getBlockType(block)] ?? "diagram";
    grouped[section].push(block);
  }

  return { grouped, attached };
}

function countByTypes(blocks: unknown[] | undefined, types: string[]) {
  return (blocks ?? []).filter((block) => types.includes(getBlockType(block))).length;
}

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

function FrameworkNodeCard({ node }: { node: FrameworkNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="font-semibold leading-7 text-zinc-950">{node.name}</p>
      {node.summary ? <p className="mt-2 text-sm leading-7 text-zinc-600">{node.summary}</p> : null}
      {node.children?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {node.children.slice(0, 6).map((child, index) => (
            <span key={`${child.name ?? "child"}-${index}`} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
              {child.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ConceptNodeBlock({ node, blocks }: { node: FrameworkNode; blocks?: unknown[] }) {
  return (
    <div className="space-y-3">
      <FrameworkNodeCard node={node} />
      {blocks?.length ? <VisualBlockRenderer blocks={blocks} showHeading={false} /> : null}
    </div>
  );
}

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950">{title}</h2>
        {description ? <p className="mt-1.5 text-sm leading-7 text-zinc-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ChapterGuide({ chapter, guideNodes }: { chapter: FrameworkChapter; guideNodes: FrameworkNode[] }) {
  return (
    <Section id="guide" title="本章导读" description="先看本章为什么学、怎么学，以及它在课程中的位置。">
      <div className="space-y-4">
        {chapter.summary ? (
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-xs font-semibold text-blue-700">章节总览</p>
            <p className="mt-1 text-sm leading-7 text-zinc-700">{chapter.summary}</p>
          </div>
        ) : null}
        {guideNodes.length ? (
          <div className="grid gap-3 xl:grid-cols-2">
            {guideNodes.map((node, index) => (
              <div key={`${node.name ?? "guide"}-${index}`} className="rounded-xl bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-500">{node.name}</p>
                {node.summary ? <p className="mt-1 text-sm leading-7 text-zinc-700">{node.summary}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
        {chapter.keyConcepts?.length ? (
          <div>
            <p className="text-xs font-semibold text-zinc-500">本章关键词</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {chapter.keyConcepts.map((concept) => (
                <span key={concept} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

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

function ChapterOutline({
  chapter,
  mode,
  activeIndex,
  total,
  blocks,
  sections,
}: {
  chapter: FrameworkChapter;
  mode: LearningMode;
  activeIndex: number;
  total: number;
  blocks: unknown[] | undefined;
  sections: Array<{ id: SectionId; label: string }>;
}) {
  const formulaCount = countByTypes(blocks, ["formula_card"]);
  const caseCount = countByTypes(blocks, ["case_card", "example_box"]);
  const chartCount = countByTypes(blocks, ["payoff_chart", "line_chart", "curve_chart", "chart_explanation", "cashflow_diagram", "decision_tree", "timeline", "process_flow"]);

  return (
    <aside className="sticky top-20 self-start rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-xs font-medium text-zinc-500">第 {activeIndex + 1} / {total} 章</p>
      <h3 className="mt-1.5 text-base font-semibold leading-7 text-zinc-950">{stripChapterPrefix(chapter.chapterTitle)}</h3>
      <p className="mt-1 text-xs text-zinc-500">当前模式：{modeMeta[mode].label}</p>

      <div className="mt-4 border-t border-zinc-100 pt-3">
        <p className="px-3 text-xs font-semibold text-zinc-400">本章导航</p>
        <div className="mt-2 space-y-1 text-sm">
          {sections.map(({ label, id }) => (
            <a key={id} href={`#${id}`} className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-100 pt-3 text-center">
        <div className="rounded-lg bg-violet-50 px-2 py-1.5">
          <p className="text-sm font-semibold text-violet-700">{formulaCount}</p>
          <p className="text-[11px] text-violet-600">公式</p>
        </div>
        <div className="rounded-lg bg-indigo-50 px-2 py-1.5">
          <p className="text-sm font-semibold text-indigo-700">{caseCount}</p>
          <p className="text-[11px] text-indigo-600">案例</p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-2 py-1.5">
          <p className="text-sm font-semibold text-emerald-700">{chartCount}</p>
          <p className="text-[11px] text-emerald-600">图表</p>
        </div>
      </div>
    </aside>
  );
}

export default function FrameworkLearningView({
  framework,
  courseName,
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

  const { guideNodes, conceptNodes } = useMemo(() => splitGuideAndConceptNodes(activeChapter?.nodes), [activeChapter]);
  const { grouped, attached } = useMemo(() => distributeVisualBlocks(activeChapter?.visualBlocks, conceptNodes), [activeChapter, conceptNodes]);
  const previousChapter = activeChapterIndex > 0 ? chapters[activeChapterIndex - 1] : null;
  const nextChapter = activeChapterIndex < chapters.length - 1 ? chapters[activeChapterIndex + 1] : null;

  if (!activeChapter) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <section className="rounded-2xl border border-zinc-200 bg-white p-8">
          <p className="text-sm text-zinc-500">暂无章节内容。</p>
        </section>
      </main>
    );
  }

  const sections = [
    { id: "guide" as const, label: "本章导读", visible: Boolean(activeChapter.summary || guideNodes.length || activeChapter.keyConcepts?.length) },
    { id: "concepts" as const, label: "关键概念", visible: Boolean(conceptNodes.length || grouped.concept.length) },
    { id: "formulas" as const, label: "公式与计算", visible: grouped.formula.length > 0 },
    { id: "cases" as const, label: "案例与例题", visible: grouped.case.length > 0 },
    { id: "diagrams" as const, label: "图表与流程", visible: grouped.diagram.length > 0 },
    { id: "summary" as const, label: "总结", visible: true },
  ].filter((section) => section.visible);

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 px-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="font-medium text-zinc-700">{courseName}</span>
              <span className="text-zinc-300">/</span>
              <span>{headerEyebrow}</span>
            </div>
            <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-zinc-950">{stripChapterPrefix(activeChapter.chapterTitle) || headerTitle || framework.title || "课程知识框架"}</h1>
            {headerDescription ? <p className="mt-1.5 max-w-4xl text-sm leading-6 text-zinc-500">{headerDescription}</p> : null}
            <details className="mt-3 max-w-4xl rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-700">课程总览</summary>
              <div className="mt-2 space-y-3 text-sm leading-7 text-zinc-600">
                {framework.overallFramework?.mainThread ? <p>{framework.overallFramework.mainThread}</p> : framework.courseSummary ? <p>{framework.courseSummary}</p> : null}
                {framework.overallFramework?.learningPath?.length ? (
                  <ol className="space-y-1.5">
                    {framework.overallFramework.learningPath.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-2">
                        <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-white text-center text-xs font-semibold leading-5 text-zinc-700">{index + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
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
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${mode === item ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}
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
        <div className="min-w-0 space-y-5">
          <ChapterGuide chapter={activeChapter} guideNodes={guideNodes} />

          {(conceptNodes.length || grouped.concept.length) ? (
            <Section id="concepts" title="关键概念" description="只保留本章真正的知识对象，导读性内容已前置到本章导读。">
              {conceptNodes.length ? (
                <div className="space-y-4">
                  {conceptNodes.map((node, index) => (
                    <ConceptNodeBlock key={`${node.name ?? "node"}-${index}`} node={node} blocks={attached.get(node)} />
                  ))}
                </div>
              ) : null}
              <VisualBlockRenderer blocks={grouped.concept} showHeading={false} />
            </Section>
          ) : null}

          {grouped.formula.length ? (
            <Section id="formulas" title="公式与计算" description="公式、计算表和相关说明放在计算型知识点附近。">
              <VisualBlockRenderer blocks={grouped.formula} showHeading={false} />
            </Section>
          ) : null}

          {grouped.case.length ? (
            <Section id="cases" title="案例与例题" description="通过案例和例题理解本章应用方式。">
              <VisualBlockRenderer blocks={grouped.case} showHeading={false} />
            </Section>
          ) : null}

          {grouped.diagram.length ? (
            <Section id="diagrams" title="图表与流程" description="未能匹配到具体概念的流程、收益图、现金流图、判断分支和时间线。">
              <VisualBlockRenderer blocks={grouped.diagram} showHeading={false} />
            </Section>
          ) : null}

          <Section id="summary" title="总结" description="完成本章后，可切换上一章或下一章继续复习。">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3">
              <button
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!previousChapter}
                onClick={() => setActiveChapterIndex((value) => Math.max(0, value - 1))}
              >
                上一章{previousChapter ? `：${stripChapterPrefix(previousChapter.chapterTitle)}` : ""}
              </button>
              <p className="text-sm font-medium text-zinc-500">第 {activeChapterIndex + 1} / {chapters.length} 章</p>
              <button
                className="rounded-lg border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!nextChapter}
                onClick={() => setActiveChapterIndex((value) => Math.min(chapters.length - 1, value + 1))}
              >
                下一章{nextChapter ? `：${stripChapterPrefix(nextChapter.chapterTitle)}` : ""}
              </button>
            </div>
          </Section>
        </div>

        <ChapterOutline chapter={activeChapter} mode={mode} activeIndex={activeChapterIndex} total={chapters.length} blocks={activeChapter.visualBlocks} sections={sections} />
      </div>
    </main>
  );
}
