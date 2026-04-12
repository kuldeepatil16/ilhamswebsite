"use client";


export default function BlogEditor({ content = "" }: { content?: string }) {
  return <textarea name="content_fr" defaultValue={content} rows={12} className="w-full rounded-xl border border-slate-200 px-3 py-2" />;
}
