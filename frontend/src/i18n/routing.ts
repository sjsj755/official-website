import { defineRouting } from "next-intl/routing";

/** 路由约定（前端设计方案 §三）：`/` 中文、`/en` 英文前缀 */
export const routing = defineRouting({
  locales: ["zh-CN", "en-US"],
  defaultLocale: "zh-CN",
  localePrefix: {
    mode: "as-needed",
    prefixes: { "en-US": "/en" },
  },
});

export type Locale = (typeof routing.locales)[number];
