"use client";


export default function BlogEditor({ content = "" }: { content?: string }) {
  return <textarea name="content_fr" defaultValue={content} rows={12} className="ui-input min-h-40" />;
}
