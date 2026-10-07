import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

/** 标准页面面包屑：首页（可点击）→ 若干层级。字符串项为不可点击层级，
 *  需要可点击的中间层（如 slug 页的列表页）传 Crumb 对象。 */
export function pageCrumbs(
  home: string,
  ...rest: Array<string | Crumb>
): Crumb[] {
  return [
    { label: home, href: "/" },
    ...rest.map((item) => (typeof item === "string" ? { label: item } : item)),
  ];
}

/** 面包屑：最后一项为当前页（aria-current="page"），其余为可点击链接 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-900">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href ?? "/"} className="hover:text-accent">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-ink-500/50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
