import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import BrandMark from "./brand-mark";
import {
  PRODUCT_LINE_KEYS,
  QUICK_LINKS,
  WORKING_CONDITION_KEYS,
} from "@/lib/navigation";

const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy" },
  { key: "cookies", href: "/cookies" },
  { key: "terms", href: "/terms" },
] as const;

/** 栏目链接条目样式（本文件 4 处共用） */
const FOOTER_LINK_CLASS =
  "inline-block border-l-2 border-transparent pl-2 text-sm text-ink-100/70 transition-colors hover:border-accent hover:bg-white/5 hover:text-white";

export default async function Footer() {
  const t = await getTranslations("footer");
  const th = await getTranslations("header");
  const tl = await getTranslations("productLines");
  const tw = await getTranslations("workingConditions");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-950 text-ink-100">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-base font-semibold tracking-wide text-white">
            <BrandMark name={th("brand")} />
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-ink-100/60">
            {t("tagline")}
          </p>
          <p className="mt-4 text-sm">
            <span className="text-ink-100/50">{t("hotlineLabel")}</span>
            <a
              href={`tel:${t("hotline")}`}
              className="ml-2 font-medium text-white hover:text-accent"
            >
              {t("hotline")}
            </a>
          </p>
        </div>

        <nav aria-label={t("sections.products")}>
          <p className="text-sm font-medium text-white">
            {t("sections.products")}
          </p>
          <ul className="mt-4 space-y-2">
            {PRODUCT_LINE_KEYS.map((key) => (
              <li key={key}>
                <Link href="/products" className={FOOTER_LINK_CLASS}>
                  {tl(`${key}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("sections.solutions")}>
          <p className="text-sm font-medium text-white">
            {t("sections.solutions")}
          </p>
          <ul className="mt-4 space-y-2">
            {WORKING_CONDITION_KEYS.map((key) => (
              <li key={key}>
                <Link href="/solutions" className={FOOTER_LINK_CLASS}>
                  {tw(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("sections.quickLinks")}>
          <p className="text-sm font-medium text-white">
            {t("sections.quickLinks")}
          </p>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={FOOTER_LINK_CLASS}>
                  {t(`quickLinks.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={FOOTER_LINK_CLASS}>
                {th("nav.contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-4 text-sm text-ink-100/50 md:flex-row md:items-center md:justify-between">
          <p>{t("copyright", { year })}</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-ink-100">
                  {t(`legal.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>{t("legal.icp")}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
