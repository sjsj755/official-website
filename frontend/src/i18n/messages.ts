import en from "@/content/en-US/common.json";
import zh from "@/content/zh-CN/common.json";
import { routing } from "./routing";

/** 消息单一来源：zh-CN 为键结构基准，en-US 必须逐键对齐（编译期强制） */
export const messages = {
  "zh-CN": zh,
  "en-US": en,
} as const;

type ZhMessages = typeof zh;
type EnMessages = typeof en;

/** 判定两个类型互为对方超集（同构即通过） */
type ShapeEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

type Assert<T extends true> = T;

/** en-US 与 zh-CN 键结构完全一致；缺键/多键直接编译失败 */
const _enMatchesZhShape: Assert<ShapeEqual<EnMessages, ZhMessages>> = true;
void _enMatchesZhShape;

/** 静态类型约束（05 文档 §3.1）：t() 的消息 key 与 locale 均收窄到本项目定义 */
declare module "next-intl" {
  interface AppConfig {
    Messages: ZhMessages;
    Locale: (typeof routing.locales)[number];
  }
}
