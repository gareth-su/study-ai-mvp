import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STUDY.AI — 结构化课程复习平台",
  description: "基于课程资料构建清晰的复习路径，按章节、模块和重点层级掌握知识。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", label: "首页" },
    { href: "/courses", label: "课程" },
    { href: "/#about", label: "关于我们" },
  ];

  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-white text-neutral-950">
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
            <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-neutral-950 hover:text-red-600 transition-colors">
              STUDY.AI
            </Link>
            <nav className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/courses"
                className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                进入学习
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
