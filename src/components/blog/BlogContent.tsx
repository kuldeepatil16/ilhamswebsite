"use client";

import ReactMarkdown from "react-markdown";

export default function BlogContent({ content }: { content: string }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-accent dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
