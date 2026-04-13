"use client";

import { useEffect } from "react";

type Props = {
  locale: string;
  dir: "ltr" | "rtl";
};

export default function LocaleDocumentSync({ locale, dir }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
  }, [locale, dir]);

  return null;
}
