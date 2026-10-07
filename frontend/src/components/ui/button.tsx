import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xs text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** 工业蓝主按钮 */
        default: "bg-accent text-white hover:bg-accent/90",
        /** 浅色底描边按钮 */
        outline:
          "border border-line-light bg-transparent text-ink-900 hover:border-accent hover:text-accent",
        /** 深色底描边按钮（首页 hero / 深色区） */
        outlineDark:
          "border border-ink-100/30 bg-transparent text-ink-100 hover:border-ink-100 hover:bg-white/5",
        /** 深色底幽灵按钮（Header 导航） */
        ghostDark: "text-ink-100 hover:bg-white/5 hover:text-white",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** 深色底导航链接（Header 巨型菜单项 / 语言切换共用）。
 *  独立常量而非 cva 变体：cn 为纯 clsx 无去重，独立携带 padding 可避免
 *  与 size 变体的 px-4 冲突。 */
export const navDarkLink =
  "inline-flex h-10 items-center rounded-xs px-3 text-sm font-medium text-ink-100 transition-colors hover:bg-white/5 hover:text-white";
