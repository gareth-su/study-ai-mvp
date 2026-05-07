"use client";

import { getFixedCourseFramework } from "@/lib/fixed-course-framework";
import { useEffect, useMemo, useState } from "react";

type Subject = { id: string; name: string };
type Artifact = { contentJson: string | null };

type FrameworkNode = {
  name?: string;
  summary?: string;
  children?: FrameworkNode[];
};

type FrameworkChapter = {
  chapterTitle?: string;
  sourceFile?: string;
  summary?: string;
  keyConcepts?: string[];
  nodes?: FrameworkNode[];
};

type FrameworkData = {
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

function FrameworkNodeView({ node, depth = 0 }: { node: FrameworkNode; depth?: number }) {
  const isRoot = depth === 0;

  return (
    <li
      className={
        isRoot
          ? "rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          : "rounded-xl border border-zinc-100 bg-zinc-50/80 p-3"
      }
    >
      <div className="flex gap-3">
        <span
          className={
            isRoot
              ? "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white"
              : "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-400"
          }
        >
          {isRoot ? depth + 1 : null}
        </span>
        <div className="min-w-0 flex-1">
          <p className={isRoot ? "font-semibold leading-7 text-zinc-950" : "font-medium leading-6 text-zinc-900"}>{node.name}</p>
          {node.summary ? <p className="mt-1 text-sm leading-7 text-zinc-600">{node.summary}</p> : null}
          {node.children?.length ? (
            <ul className={isRoot ? "mt-4 space-y-3" : "mt-3 space-y-2 border-l border-zinc-200 pl-3"}>
              {node.children.map((child, index) => (
                <FrameworkNodeView key={`${child.name ?? "node"}-${index}`} node={child} depth={depth + 1} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function parseFramework(content: string): FrameworkData | null {
  try {
    return JSON.parse(content) as FrameworkData;
  } catch {
    return null;
  }
}

export default function FrameworkPage() {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [level, setLevel] = useState<"concise" | "detailed">("detailed");
  const [content, setContent] = useState<string>(() => JSON.stringify(getFixedCourseFramework("DETAILED"), null, 2));

  async function loadSubject() {
    try {
      const res = await fetch("/api/subjects/default");
      const data = await res.json();
      if (data.subject) setSubject(data.subject);
    } catch {
      setSubject({ id: "fixed-course", name: "衍生金融工具" });
    }
  }

  async function loadFramework(subjectId: string, lv: "concise" | "detailed") {
    try {
      const res = await fetch(`/api/subjects/${subjectId}/framework?level=${lv}`);
      const data = (await res.json()) as { artifact: Artifact | null };
      setContent(data.artifact?.contentJson ?? JSON.stringify(getFixedCourseFramework(lv === "detailed" ? "DETAILED" : "CONCISE"), null, 2));
    } catch {
      setContent(JSON.stringify(getFixedCourseFramework(lv === "detailed" ? "DETAILED" : "CONCISE"), null, 2));
    }
  }

  useEffect(() => {
    void loadSubject();
  }, []);

  useEffect(() => {
    if (subject) void loadFramework(subject.id, level);
  }, [subject, level]);

  const framework = useMemo(() => parseFramework(content), [content]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-7">
          <p className="text-sm font-medium text-zinc-500">{subject?.name ?? "衍生金融工具"}</p>
          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{framework?.title ?? "知识框架"}</h1>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-600">
                {framework?.courseSummary ?? "本页展示维护者预先生成的固定课程知识系统。"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-zinc-950 px-3 py-1.5 font-medium text-white">固定课程框架</span>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-700">市场机制 → 风险管理 → 定价基础</span>
                <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-zinc-700">{framework?.chapters?.length ?? 0} 个章节</span>
              </div>
            </div>
            <div className="flex w-fit rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-sm">
              <button
                className={`rounded-lg px-3 py-1.5 ${level === "concise" ? "bg-white font-medium text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}
                onClick={() => setLevel("concise")}
              >
                提纲版
              </button>
              <button
                className={`rounded-lg px-3 py-1.5 ${level === "detailed" ? "bg-white font-medium text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}
                onClick={() => setLevel("detailed")}
              >
                讲义版
              </button>
            </div>
          </div>
        </div>
      </section>

      {framework ? (
        <>
          {framework.chapters?.length ? (
            <nav className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">章节导航</p>
                  <p className="mt-1 text-xs text-zinc-500">讲义版内容较长，可按章节快速定位。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {framework.chapters.map((chapter, index) => (
                    <a
                      key={`${chapter.chapterTitle ?? "chapter"}-${index}`}
                      href={`#chapter-${index + 1}`}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
                    >
                      {chapter.chapterTitle}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          ) : null}

          {framework.overallFramework ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="max-w-4xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Course Spine</p>
                <h2 className="mt-2 text-xl font-semibold text-zinc-950">总体知识主线</h2>
                {framework.overallFramework.mainThread ? (
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{framework.overallFramework.mainThread}</p>
                ) : null}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {framework.overallFramework.learningPath?.length ? (
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <h3 className="font-semibold text-zinc-900">学习路径</h3>
                    <ol className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
                      {framework.overallFramework.learningPath.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-zinc-700 shadow-sm">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {framework.overallFramework.crossChapterRelations?.length ? (
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <h3 className="font-semibold text-zinc-900">章节关系</h3>
                    <div className="mt-4 space-y-3">
                      {framework.overallFramework.crossChapterRelations.map((relation, index) => (
                        <div key={`${relation.from}-${relation.to}-${index}`} className="rounded-xl border border-zinc-100 bg-white p-3 text-sm leading-7 text-zinc-600">
                          <p className="font-medium text-zinc-900">{relation.from} → {relation.to}</p>
                          <p className="mt-1">{relation.relation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {framework.overallFramework.coreConceptMap?.length ? (
                <div className="mt-6">
                  <h3 className="font-semibold text-zinc-900">核心概念地图</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {framework.overallFramework.coreConceptMap.map((item, index) => (
                      <div key={`${item.concept ?? "concept"}-${index}`} className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm">
                        <p className="font-semibold text-zinc-950">{item.concept}</p>
                        {item.appearsIn?.length ? <p className="mt-2 text-xs leading-5 text-zinc-500">出现位置：{item.appearsIn.join("、")}</p> : null}
                        {item.importance ? <p className="mt-3 leading-7 text-zinc-600">{item.importance}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="space-y-6">
            {framework.chapters?.map((chapter, index) => (
              <article id={`chapter-${index + 1}`} key={`${chapter.chapterTitle ?? "chapter"}-${index}`} className="scroll-mt-24 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-4xl">
                    <p className="text-xs font-medium text-zinc-500">章节 {index + 1}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">{chapter.chapterTitle}</h2>
                    <p className="mt-2 text-xs text-zinc-400">来源：{chapter.sourceFile}</p>
                    <p className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-7 text-blue-950">{chapter.summary}</p>
                  </div>
                </div>

                {chapter.keyConcepts?.length ? (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-zinc-900">关键概念</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {chapter.keyConcepts.map((concept) => (
                        <span key={concept} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {chapter.nodes?.length ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-zinc-900">讲义式知识展开</p>
                    <ul className="mt-4 space-y-4">
                      {chapter.nodes.map((node, nodeIndex) => (
                        <FrameworkNodeView key={`${node.name ?? "node"}-${nodeIndex}`} node={node} />
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </section>
        </>
      ) : (
        <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-4 text-sm whitespace-pre-wrap">{content}</pre>
      )}
    </main>
  );
}
