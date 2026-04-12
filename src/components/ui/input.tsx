"use client";

﻿import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("w-full rounded-lg border border-slate-200 px-3 py-2", className)} {...props} />
));
Input.displayName = "Input";
