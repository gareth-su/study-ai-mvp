import Link from "next/link";

const links = [
  { href: "/framework", label: "知识框架" },
  { href: "/cheatsheet", label: "速记提纲" },
  { href: "/practice", label: "练习" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-bold">衍生金融工具 - AI学习平台</h1>
      <p className="text-sm text-zinc-600">核心流程：预置课程知识库 → 知识框架/提纲 → 练习与判分</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm hover:bg-zinc-50"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
