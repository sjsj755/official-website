import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/layout/page-header";
import { pageCrumbs } from "@/components/layout/breadcrumb";
import { initLocale } from "@/i18n/locale";
import type { SlugPageProps } from "@/types/page-props";

/** 产品详情：标题暂以 slug 呈现，文案/参数在 Week 2 由 CMS + 业务 API 提供 */
export default async function ProductDetailPage({ params }: SlugPageProps) {
  const { slug } = await params;
  await initLocale(params);

  const t = await getTranslations("pages.products");
  const tb = await getTranslations("breadcrumb");

  return (
    <PageHeader
      title={slug}
      description={t("description")}
      crumbs={pageCrumbs(tb("home"), { label: t("title"), href: "/products" }, slug)}
    />
  );
}
