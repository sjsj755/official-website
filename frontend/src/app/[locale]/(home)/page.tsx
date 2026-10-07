import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { initLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { PRODUCT_LINE_KEYS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { PageProps } from "@/types/page-props";

export default async function HomePage({ params }: PageProps) {
  await initLocale(params);

  const t = await getTranslations("home");
  const tl = await getTranslations("productLines");

  return (
    <>
      <section className="bg-surface-950 text-ink-100">
        <div className="container-page py-24">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-100/80">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className={buttonVariants({ size: "lg" })}>
              {t("heroPrimaryCta")}
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "outlineDark", size: "lg" })}
            >
              {t("heroSecondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
          {t("productsHeading")}
        </h2>
        <p className="mt-2 text-ink-500">{t("productsSubheading")}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_LINE_KEYS.map((key) => (
            <li key={key}>
              <Link
                href="/products"
                className="group flex h-full flex-col border border-line-light bg-white p-6 transition-colors hover:border-accent"
              >
                <h3 className="text-base font-medium text-ink-900 group-hover:text-accent">
                  {tl(`${key}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">
                  {tl(`${key}.description`)}
                </p>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={cn(
                "flex h-full flex-col justify-center border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent",
              )}
            >
              <span className="text-base font-medium text-accent">
                {t("heroSecondaryCta")}
              </span>
              <span className="mt-1 text-sm text-ink-500">
                {t("inquiryHint")}
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
