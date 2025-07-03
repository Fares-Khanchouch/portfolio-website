// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` is a common helper for merging class names
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}