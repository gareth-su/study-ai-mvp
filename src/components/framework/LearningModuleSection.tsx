import type { ReactNode } from "react";
import VisualBlockRenderer from "./VisualBlockRenderer";
import type { LearningModule } from "./buildLearningModules";

function BasicCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      {title && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">{title}</p>}
      {children}
    </div>
  );
}

export default function LearningModuleSection({
  module,
}: {
  module: LearningModule;
}) {
  const node = module.sourceNode;
  const nodeSummary = node.summary;

  // Also collect child names even without summary — they are knowledge points
  const conceptItems = module.conceptItems;
  const blocks = module.visualBlocks;

  const hasConcepts = conceptItems.length > 0;
  const hasContent = nodeSummary || hasConcepts || blocks.length > 0;

  if (!hasContent) {
    // Empty module: still show header, but nothing inside
    return (
      <section
        id={module.id}
        className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5"
      >
        <div className="mb-3">
          <p className="text-xs font-medium text-zinc-400">
            模块 {String(module.index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-zinc-950">
            {module.title}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      id={module.id}
      className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5"
    >
      {/* Module header */}
      <div className="mb-4">
        <p className="text-xs font-medium text-zinc-400">
          模块 {String(module.index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-zinc-950">
          {module.title}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Core explanation from node summary */}
        {nodeSummary && (
          <BasicCard>
            <p className="text-sm leading-7 text-zinc-700">{nodeSummary}</p>
          </BasicCard>
        )}

        {/* Knowledge points — always show names, add summaries where available */}
        {hasConcepts && (
          <BasicCard title="核心知识点">
            <div className="space-y-2">
              {conceptItems.map((child, i) => (
                <div key={`kp-${i}`}>
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                    <div>
                      <span className="text-sm font-medium text-zinc-900">
                        {child.name}
                      </span>
                      {child.summary && (
                        <p className="mt-0.5 text-sm leading-6 text-zinc-600">
                          {child.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BasicCard>
        )}

        {/* VisualBlocks: formulas, diagrams, examples, cases in natural order */}
        {blocks.length > 0 && (
          <VisualBlockRenderer blocks={blocks} showHeading={false} />
        )}
      </div>
    </section>
  );
}
