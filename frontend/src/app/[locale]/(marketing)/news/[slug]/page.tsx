import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/layout/page-header";
import { pageCrumbs } from "@/components/layout/breadcrumb";
import { initLocale } from "@/i18n/locale";
import type { SlugPageProps } from "@/types/page-props";

/** 资讯详情：标题暂以 slug 呈现，内容由 CMS（Article）在 Week 4 提供 */
export default async function NewsDetailPage({ params }: SlugPageProps) {
  const { slug } = await params;
  await initLocale(params);

  const t = await getTranslations("pages.news");
  const tb = await getTranslations("breadcrumb");

  return (
    <PageHeader
      title={slug}
      description={t("description")}
      crumbs={pageCrumbs(tb("home"), { label: t("title"), href: "/news" }, slug)}
    />
  );
}
