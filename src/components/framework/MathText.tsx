"use client";

import "katex/dist/katex.min.css";
import katex from "katex";
import { Fragment, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Token types for the parser                                         */
/* ------------------------------------------------------------------ */

type Token =
  | { type: "text"; value: string }
  | { type: "inlineLatex"; value: string }
  | { type: "blockLatex"; value: string };

/* ------------------------------------------------------------------ */
/*  Parse a string into tokens: plain text, \(...\), \[...\]           */
/* ------------------------------------------------------------------ */

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];

  const regex = /\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Plain text before this match
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      // Block-level \[ ... \]
      tokens.push({ type: "blockLatex", value: match[1].trim() });
    } else if (match[2] !== undefined) {
      // Inline \( ... \)
      tokens.push({ type: "inlineLatex", value: match[2].trim() });
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining plain text after last match
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens;
}

/* ------------------------------------------------------------------ */
/*  Render a single LaTeX string with KaTeX, fallback on error         */
/* ------------------------------------------------------------------ */

function renderLatex(latex: string, displayMode: boolean): string | null {
  try {
    return katex.renderToString(latex, { displayMode, throwOnError: true });
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  MathText component                                                 */
/* ------------------------------------------------------------------ */

export default function MathText({ text, as }: { text: string; as?: "p" | "span" }) {
  const tokens = tokenize(text);

  // Fast path: no LaTeX at all, render plain text directly
  if (tokens.length === 1 && tokens[0]?.type === "text") {
    return as === "span" ? <span>{text}</span> : <>{text}</>;
  }

  const children: ReactNode[] = tokens.map((token, i) => {
    if (token.type === "text") {
      return <Fragment key={i}>{token.value}</Fragment>;
    }

    if (token.type === "blockLatex") {
      const html = renderLatex(token.value, true);
      if (!html) return <Fragment key={i}>{token.value}</Fragment>;
      return (
        <span
          key={i}
          className="inline-block w-full text-center"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // inlineLatex
    const html = renderLatex(token.value, false);
    if (!html) return <Fragment key={i}>{token.value}</Fragment>;
    return (
      <span
        key={i}
        className="[&_.katex]:text-xs [&_.katex]:leading-normal"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });

  return as === "span" ? <span>{children}</span> : <>{children}</>;
}
