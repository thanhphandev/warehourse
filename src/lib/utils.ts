import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from 'slugify';
import { ICategory } from "@/models/category";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}




