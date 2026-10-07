import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const i18n = createNavigation(routing);

type LinkProps = Omit<ComponentProps<typeof i18n.Link>, "prefetch">;

/** 感知 locale 的导航 API：Link/usePathname/useRouter 自动处理 `/` 与 `/en` 前缀 */
export const { redirect, usePathname, useRouter } = i18n;

/**
 * 站点级 Link：统一禁用 Next 自动 prefetch。
 * 全站为静态预渲染页，TTFB 极低，prefetch 收益微小；而首屏视口内的导航
 * Link 触发的 prefetch 会连带加载目标路由组的 chunk，既把其它页面的 JS
 * 计入首页加载（污染"首页 JS ≤ 120KB (gzip)"预算口径），又在慢速网络下
 * 与 LCP 争抢带宽（前端设计方案 §五）。
 */
export function Link(props: LinkProps) {
  return <i18n.Link {...props} prefetch={false} />;
}
