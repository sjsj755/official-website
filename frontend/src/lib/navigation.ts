/** 信息架构常量：与消息文件 namespace 一一对应（前端设计方案 §三 路由表） */

export const NAV_ITEMS = [
  { key: "grades", href: "/grades" },
  { key: "solutions", href: "/solutions" },
  { key: "cases", href: "/cases" },
  { key: "factory", href: "/factory" },
  { key: "certifications", href: "/certifications" },
  { key: "about", href: "/about" },
] as const;

export const PRODUCT_LINE_KEYS = [
  "cutting",
  "mining",
  "wear",
  "rods",
  "custom",
] as const;

export const WORKING_CONDITION_KEYS = [
  "steel",
  "stainless",
  "castIron",
  "mining",
  "spray",
] as const;

export const QUICK_LINKS = [
  { key: "grades", href: "/grades" },
  { key: "cases", href: "/cases" },
  { key: "factory", href: "/factory" },
  { key: "certifications", href: "/certifications" },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
] as const;
