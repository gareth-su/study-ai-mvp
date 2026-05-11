import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="border-b border-neutral-100 bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              结构化复习
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
              结构化学习，
              <br />
              让复杂知识变简单
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-neutral-500">
              基于课程资料构建清晰的复习路径，帮助你按章节、模块和重点层级掌握知识。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                开始学习
              </Link>
              <Link
                href="/courses"
                className="rounded-lg border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                浏览课程
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-sm font-bold text-red-700">
                    01
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">按章节复习</p>
                    <p className="text-xs text-neutral-500">逐章展开知识框架</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-sm font-bold text-red-700">
                    02
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">梳理核心概念</p>
                    <p className="text-xs text-neutral-500">围绕重点建立复习线索</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-sm font-bold text-red-700">
                    03
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">系统学习</p>
                    <p className="text-xs text-neutral-500">进入课程后按知识模块复习</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-100 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-400">
          <span>STUDY.AI</span>
          <span>结构化课程复习平台</span>
        </div>
      </footer>
    </main>
  );
}
