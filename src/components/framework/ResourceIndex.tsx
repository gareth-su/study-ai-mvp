import type { LearningModule } from "./buildLearningModules";

type ResourceEntry = {
  title: string;
  moduleId: string;
  moduleTitle: string;
};

type ResourceIndexData = {
  formulas: ResourceEntry[];
  examples: ResourceEntry[];
  cases: ResourceEntry[];
  charts: ResourceEntry[];
};

function getBlockTitle(block: unknown): string {
  if (!block || typeof block !== "object") return "";
  const b = block as { title?: string };
  return b.title ?? "";
}

function getBlockType(block: unknown): string {
  if (!block || typeof block !== "object" || !("type" in block)) return "";
  return typeof (block as { type?: unknown }).type === "string" ? (block as { type: string }).type : "";
}

function buildIndex(modules: LearningModule[]): ResourceIndexData {
  const formulas: ResourceEntry[] = [];
  const examples: ResourceEntry[] = [];
  const cases: ResourceEntry[] = [];
  const charts: ResourceEntry[] = [];

  for (const mod of modules) {
    for (const block of mod.visualBlocks) {
      const title = getBlockTitle(block);
      if (!title) continue;
      const entry: ResourceEntry = { title, moduleId: mod.id, moduleTitle: mod.title };
      const type = getBlockType(block);
      switch (type) {
        case "formula_card":
          formulas.push(entry);
          break;
        case "example_box":
          examples.push(entry);
          break;
        case "case_card":
          cases.push(entry);
          break;
        case "payoff_chart":
        case "line_chart":
        case "curve_chart":
        case "chart_explanation":
        case "cashflow_diagram":
        case "decision_tree":
        case "timeline":
        case "process_flow":
          charts.push(entry);
          break;
      }
    }
  }

  return { formulas, examples, cases, charts };
}

export default function ResourceIndex({ modules }: { modules: LearningModule[] }) {
  const index = buildIndex(modules);
  const hasAny = index.formulas.length > 0 || index.examples.length > 0 || index.cases.length > 0 || index.charts.length > 0;
  if (!hasAny) return null;

  return (
    <section id="resource-index" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950">本章资源索引</h2>
        <p className="mt-1.5 text-sm leading-7 text-zinc-500">快速定位具体公式、例题、案例和图表。</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {index.formulas.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">公式</p>
            <ol className="space-y-1.5">
              {index.formulas.map((entry, i) => (
                <li key={`f-${i}`} className="text-sm">
                  <a href={`#${entry.moduleId}`} className="text-zinc-700 hover:text-zinc-950 hover:underline">
                    {entry.title}
                  </a>
                  <span className="ml-2 text-xs text-zinc-400">→ {entry.moduleTitle}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {index.examples.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">例题</p>
            <ol className="space-y-1.5">
              {index.examples.map((entry, i) => (
                <li key={`e-${i}`} className="text-sm">
                  <a href={`#${entry.moduleId}`} className="text-zinc-700 hover:text-zinc-950 hover:underline">
                    {entry.title}
                  </a>
                  <span className="ml-2 text-xs text-zinc-400">→ {entry.moduleTitle}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {index.cases.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">案例</p>
            <ol className="space-y-1.5">
              {index.cases.map((entry, i) => (
                <li key={`c-${i}`} className="text-sm">
                  <a href={`#${entry.moduleId}`} className="text-zinc-700 hover:text-zinc-950 hover:underline">
                    {entry.title}
                  </a>
                  <span className="ml-2 text-xs text-zinc-400">→ {entry.moduleTitle}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {index.charts.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">图表</p>
            <ol className="space-y-1.5">
              {index.charts.map((entry, i) => (
                <li key={`ch-${i}`} className="text-sm">
                  <a href={`#${entry.moduleId}`} className="text-zinc-700 hover:text-zinc-950 hover:underline">
                    {entry.title}
                  </a>
                  <span className="ml-2 text-xs text-zinc-400">→ {entry.moduleTitle}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
