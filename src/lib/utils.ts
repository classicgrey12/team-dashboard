import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock, CheckCircle2, AlertCircle, Coffee, Brain } from 'lucide-react';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}