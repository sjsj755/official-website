"use client";

import type { Locale } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import { navDarkLink } from "@/components/ui/button";

/** 语言切换：保持当前路径，仅在 `/` 与 `/en` 前缀间切换。
 *  locale 与 aria-label 由服务端注入，避免引入 next-intl 运行时。 */
export default function LocaleSwitcher({
  locale,
  ariaLabel,
}: {
  locale: Locale;
  ariaLabel: string;
}) {
  const pathname = usePathname();

  const other: Locale = locale === "zh-CN" ? "en-US" : "zh-CN";
  const label = other === "en-US" ? "EN" : "中文";

  return (
    <Link
      href={pathname}
      locale={other}
      aria-label={ariaLabel}
      className={navDarkLink}
    >
      {label}
    </Link>
  );
}
