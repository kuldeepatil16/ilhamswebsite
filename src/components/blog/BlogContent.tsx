"use client";

import ReactMarkdown from "react-markdown";

export default function BlogContent({ content }: { content: string }) {
  return <article className="prose max-w-none"><ReactMarkdown>{content}</ReactMarkdown></article>;
}
