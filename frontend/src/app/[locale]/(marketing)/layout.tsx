/** 内页共享容器：1280 内容宽 + 纵向留白 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container-page py-10">{children}</div>;
}
