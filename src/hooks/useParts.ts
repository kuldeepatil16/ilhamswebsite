"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SparePart } from "@/types";

export function useParts() {
  const [data, setData] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("spare_parts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data: rows }) => {
        setData((rows as SparePart[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
