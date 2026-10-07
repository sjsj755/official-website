import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "./routing";

/**
 * 解析并校验路由 locale：非法值直接 404。
 * middleware 是第一道边界（正常流量不会出现非法 locale），
 * 此处保证服务端渲染路径在类型与运行时上都收窄到合法 locale。
 */
export async function resolveLocale(
  params: Promise<{ locale: string }> | Promise<{ locale: string; slug: string }>,
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

/**
 * 页面初始化：resolveLocale + setRequestLocale 合一（全站 15+ 页面的
 * 标准开场）。返回收窄后的 locale，供 lang 属性等场景使用。
 */
export async function initLocale(
  params: Promise<{ locale: string }> | Promise<{ locale: string; slug: string }>,
) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return locale;
}
