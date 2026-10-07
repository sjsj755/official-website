"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants, navDarkLink } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavData } from "./nav-data";

const HOVER_CLOSE_DELAY = 200;

/** 桌面端导航：产品中心巨型菜单。
 *  受控交互壳（hover 宽限关闭 / 键盘可达 / 点击外部关闭），文案经 NavData
 *  由服务端注入。原 Radix NavigationMenu 为最大单一 JS 依赖，为守住
 *  §五 首页 JS 预算改为自研；移动端抽屉仍用文档钦定的 Radix Dialog。 */
export default function DesktopNav({
  className,
  data,
}: {
  className?: string;
  data: NavData;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    clearCloseTimer();
    setOpen(true);
  };
  const closeSoon = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  };
  const closeNow = () => {
    clearCloseTimer();
    setOpen(false);
  };

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        rootRef.current &&
        e.target instanceof Node &&
        !rootRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // 卸载时清理悬停关闭定时器
  useEffect(() => clearCloseTimer, []);

  return (
    <nav
      ref={rootRef}
      className={className}
      aria-label={data.mainNavLabel}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onKeyDown={(e) => {
        // Esc 关闭面板并把焦点还给触发器
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          closeNow();
          triggerRef.current?.focus();
        }
      }}
    >
      <ul className="flex items-center gap-1">
        <li className="relative">
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="desktop-products-menu"
            onClick={() => (open ? closeNow() : openNow())}
            onKeyDown={(e) => {
              // 方向键向下：展开并把焦点移入面板首个链接
              if (e.key === "ArrowDown" && !open) {
                e.preventDefault();
                openNow();
                requestAnimationFrame(() => {
                  panelRef.current?.querySelector<HTMLElement>("a")?.focus();
                });
              }
            }}
            className="group inline-flex h-10 items-center gap-1 rounded-xs px-3 text-sm font-medium text-ink-100 transition-colors hover:bg-white/5 hover:text-white data-[open=true]:bg-white/5 data-[open=true]:text-white"
            data-open={open}
          >
            {data.productsLabel}
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          <div
            id="desktop-products-menu"
            ref={panelRef}
            hidden={!open}
            onBlur={(e) => {
              // 焦点离开整个导航区域时收起
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                closeNow();
              }
            }}
            className="absolute top-full left-0 mt-1 w-[640px] rounded-xs border border-line bg-surface-800 p-4 shadow-xl"
          >
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="text-sm font-medium text-ink-100/60">
                {data.productsLabel}
              </span>
              <Link
                href="/products"
                onClick={closeNow}
                className="text-sm font-medium text-accent hover:underline"
              >
                {data.productsMenuAllLabel}
              </Link>
            </div>
            <ul className="grid grid-cols-3 gap-2">
              {data.productLines.map((line) => (
                <li key={line.key}>
                  <Link
                    href="/products"
                    onClick={closeNow}
                    className="block h-full border-l-2 border-transparent px-3 py-2 transition-colors hover:border-accent hover:bg-white/5"
                  >
                    <span className="block text-sm font-medium text-white">
                      {line.name}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-ink-100/60">
                      {line.description}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={closeNow}
                  className={cn(
                    buttonVariants({ variant: "outlineDark" }),
                    "h-full w-full",
                  )}
                >
                  {data.contactLabel}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {data.items.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className={navDarkLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
