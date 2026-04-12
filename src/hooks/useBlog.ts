"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types";

export function useBlog() {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data: rows }) => {
        setData((rows as BlogPost[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
