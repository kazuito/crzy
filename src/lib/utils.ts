import { clsx, type ClassValue } from "clsx";
import { Color, parseColor } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStorageColors() {
  return JSON.parse(
    localStorage.getItem("colors") ?? '["#f00", "#0f0", "#00f"]'
  ).map(parseColor) as Color[];
}

export function getStorageFps() {
  return Number(localStorage.getItem("fps")) || 10;
}
