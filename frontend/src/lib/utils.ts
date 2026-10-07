import { clsx, type ClassValue } from "clsx";

/** 拼接类名。站点类名均为受控组合（变体 + 附加类），无冲突去重需求，
 *  因此不引入 tailwind-merge（见前端设计方案 §五 JS 预算）。 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
