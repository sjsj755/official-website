import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { initLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: t("template"),
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await initLocale(params);
  const t = await getTranslations("header");

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
