import Breadcrumb, { type Crumb } from "./breadcrumb";

export type { Crumb };

type PageHeaderProps = {
  title: string;
  description: string;
  crumbs: Crumb[];
};

/** 内页页头：面包屑 + 标题 + 描述（前端设计方案 §三：全站面包屑） */
export default function PageHeader({
  title,
  description,
  crumbs,
}: PageHeaderProps) {
  return (
    <div className="border-b border-line-light pb-6">
      <Breadcrumb items={crumbs} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-900">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500">{description}</p>
    </div>
  );
}
