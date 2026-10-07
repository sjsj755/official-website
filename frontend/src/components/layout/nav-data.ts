export type NavProductLine = { key: string; name: string; description: string };
export type NavItemLink = { key: string; href: string; label: string };

/**
 * 导航层文案快照：由服务端组件解析 next-intl 消息后生成的渲染就绪数据，
 * client 组件只接收纯字符串 props，从而不把 next-intl 的 useTranslations
 * 运行时拉进 client bundle（前端设计方案 §五：首页 JS ≤ 120KB (gzip)）。
 */
export type NavData = {
  brand: string;
  mainNavLabel: string;
  productsLabel: string;
  productsMenuAllLabel: string;
  contactLabel: string;
  productLines: NavProductLine[];
  items: NavItemLink[];
  mobile: { openMenu: string; closeMenu: string; menuTitle: string };
  languageLabel: string;
};
