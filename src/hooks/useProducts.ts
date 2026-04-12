"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data: rows }) => {
        setData((rows as Product[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
