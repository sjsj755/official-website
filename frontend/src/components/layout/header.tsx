import { getLocale, getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { NAV_ITEMS, PRODUCT_LINE_KEYS } from "@/lib/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import BrandMark from "./brand-mark";
import type { NavData } from "./nav-data";
import DesktopNav from "./mega-menu";
import LocaleSwitcher from "./locale-switcher";
import MobileNav from "./mobile-nav";

/** 吸顶导航（前端设计方案 §三：全站吸顶导航 + 产品巨型菜单）。
 *  服务端组件：文案在此解析为 NavData 后下发，client 侧不引入 next-intl
 *  消息运行时（性能预算 §五）。 */
export default async function Header() {
  const [locale, t, tl] = await Promise.all([
    getLocale(),
    getTranslations("header"),
    getTranslations("productLines"),
  ]);

  const navData: NavData = {
    brand: t("brand"),
    mainNavLabel: t("mainNav"),
    productsLabel: t("nav.products"),
    productsMenuAllLabel: t("productsMenuAll"),
    contactLabel: t("nav.contact"),
    productLines: PRODUCT_LINE_KEYS.map((key) => ({
      key,
      name: tl(`${key}.name`),
      description: tl(`${key}.description`),
    })),
    items: NAV_ITEMS.map((item) => ({ ...item, label: t(`nav.${item.key}`) })),
    mobile: {
      openMenu: t("openMenu"),
      closeMenu: t("closeMenu"),
      menuTitle: t("menuTitle"),
    },
    languageLabel: t("language"),
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-950 text-ink-100">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-base font-semibold tracking-wide text-white"
        >
          <BrandMark name={navData.brand} />
        </Link>

        <DesktopNav data={navData} className="relative hidden lg:flex" />

        <div className="flex items-center gap-1">
          <LocaleSwitcher locale={locale} ariaLabel={navData.languageLabel} />
          <Link
            href="/contact"
            className={cn(buttonVariants(), "hidden lg:inline-flex")}
          >
            {navData.contactLabel}
          </Link>
          <MobileNav data={navData} locale={locale} />
        </div>
      </div>
    </header>
  );
}
