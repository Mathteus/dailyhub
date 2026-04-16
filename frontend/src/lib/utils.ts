import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundNumber(num: number) {
  if (num > 9) {
    return String('10');
  }

  return String('0' + num);
}

export function timeFormated() {
  const now = new Date();
  return `${roundNumber(now.getDate())}/${roundNumber(now.getMonth() + 1)}/${now.getFullYear()} ${roundNumber(now.getHours())}:${roundNumber(now.getMinutes())}:${roundNumber(now.getSeconds())}`;
}