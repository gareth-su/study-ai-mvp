import { safeTextResponse } from "@/lib/ai/client";

export async function generateFramework(input: { subjectName: string; chunks: string[]; detail: "CONCISE" | "DETAILED"; }) {
  const prompt = `你是金融课程教研助理。请基于以下资料，生成“${input.subjectName}”的知识框架（JSON）。\n要求：\n1) 输出JSON对象，包含title和nodes\n2) nodes是树形数组，每个节点有name、summary、children\n3) 风格=${input.detail === "CONCISE" ? "简洁" : "详细"}\n资料：\n${input.chunks.join("\n\n---\n\n")}`;
  const text = await safeTextResponse(prompt);
  return text;
}
