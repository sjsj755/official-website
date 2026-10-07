import { notFound } from "next/navigation";

/** 兜底路由：未知路径（含未知 locale 前缀）统一进入 locale 感知的 404 */
export default function CatchAllPage() {
  notFound();
}
