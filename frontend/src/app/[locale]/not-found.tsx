import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p aria-hidden="true" className="text-6xl font-semibold text-ink-900">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-ink-900">{t("title")}</h1>
      <p className="mt-2 text-ink-500">{t("description")}</p>
      <Link
        href="/"
        className={`${buttonVariants({ variant: "outline" })} mt-8`}
      >
        {t("action")}
      </Link>
    </div>
  );
}
