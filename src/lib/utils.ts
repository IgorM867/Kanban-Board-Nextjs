import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function consoleError(functionName: string, message: string) {
  const timestamp = new Date().toISOString();

  console.log(
    `\x1b[33m[${timestamp}] \x1b[37mError in \x1b[34m${functionName}\x1b[37m: \x1b[31m${message}\x1b[37m`
  );
}
