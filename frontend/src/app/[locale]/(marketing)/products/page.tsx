import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/layout/page-header";
import { pageCrumbs } from "@/components/layout/breadcrumb";
import { initLocale } from "@/i18n/locale";
import type { PageProps } from "@/types/page-props";

export default async function ProductsPage({ params }: PageProps) {
  await initLocale(params);

  const t = await getTranslations("pages.products");
  const tb = await getTranslations("breadcrumb");

  return (
    <PageHeader
      title={t("title")}
      description={t("description")}
      crumbs={pageCrumbs(tb("home"), t("title"))}
    />
  );
}
