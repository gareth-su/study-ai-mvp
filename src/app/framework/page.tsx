"use client";

import FrameworkLearningView, { type FrameworkData } from "@/components/framework/FrameworkLearningView";
import { getFixedCourseFramework } from "@/lib/fixed-course-framework";
import { useEffect, useMemo, useState } from "react";

type Subject = { id: string; name: string };
type Artifact = { contentJson: string | null };

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

  if (!framework) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-4 text-sm whitespace-pre-wrap">{content}</pre>
      </main>
    );
  }

  return (
    <FrameworkLearningView
      framework={framework}
      courseName={subject?.name ?? "衍生金融工具"}
      mode={level}
      onModeChange={setLevel}
      headerEyebrow="期末复习"
      headerTitle={framework.title ?? "课程知识框架"}
      headerDescription={framework.courseSummary ?? "围绕衍生金融工具课程进行系统化梳理，帮助快速定位章节主线、核心概念、公式、案例和图表。"}
    />
  );
}
