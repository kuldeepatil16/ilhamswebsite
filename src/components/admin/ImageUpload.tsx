"use client";


import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKETS } from "@/lib/constants";

export default function ImageUpload({ bucket = STORAGE_BUCKETS.productImages, onUploaded }: { bucket?: string; onUploaded: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onUploaded(data.publicUrl);
    }

    setLoading(false);
  }

  return <input type="file" accept="image/*" onChange={onChange} disabled={loading} className="text-sm" />;
}
