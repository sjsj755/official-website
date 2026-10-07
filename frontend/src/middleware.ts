import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 匹配除 API、Next 内部资源与带后缀静态文件外的所有路径
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
