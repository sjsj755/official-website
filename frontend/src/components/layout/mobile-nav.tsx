"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";
import { Dialog } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavData } from "./nav-data";
import LocaleSwitcher from "./locale-switcher";

/** 移动端导航抽屉：基于通用弹窗零件 ui/dialog（原生 <dialog>，替代
 *  Radix Dialog 以守住 §五 JS 预算）。文案由服务端 Header 以 NavData
 *  注入，本组件不引入 next-intl 运行时。 */
export default function MobileNav({
  data,
  locale,
}: {
  data: NavData;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={data.mobile.openMenu}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "ghostDark", size: "icon" }),
          "lg:hidden",
        )}
      >
        <MenuIcon className="size-5" />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="mobile-menu-title"
        className={cn(
          "fixed inset-y-0 left-auto right-0 z-50 m-0 h-dvh w-80 max-w-[85vw]",
          "overflow-y-auto border-l border-line bg-surface-950 p-6 text-ink-100",
          "backdrop:bg-black/60 animate-drawer-in",
        )}
      >
        <div className="flex items-center justify-between">
          <h2
            id="mobile-menu-title"
            className="text-base font-semibold text-white"
          >
            {data.mobile.menuTitle}
          </h2>
          <button
            type="button"
            aria-label={data.mobile.closeMenu}
            onClick={() => setOpen(false)}
            className={buttonVariants({ variant: "ghostDark", size: "icon" })}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <nav className="mt-6" aria-label={data.mainNavLabel}>
          <p className="px-3 text-xs font-medium tracking-wider text-ink-100/50 uppercase">
            {data.productsLabel}
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="block border-l-2 border-accent bg-white/5 px-3 py-2 text-sm font-medium text-white"
              >
                {data.productsMenuAllLabel}
              </Link>
            </li>
            {data.productLines.map((line) => (
              <li key={line.key}>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="block border-l-2 border-transparent px-3 py-2 text-sm text-ink-100 transition-colors hover:border-accent hover:bg-white/5 hover:text-white"
                >
                  {line.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-1 border-t border-line pt-6">
            {data.items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-l-2 border-transparent px-3 py-2 text-sm text-ink-100 transition-colors hover:border-accent hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3 border-t border-line pt-6">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "w-full")}
            >
              {data.contactLabel}
            </Link>
            <LocaleSwitcher locale={locale} ariaLabel={data.languageLabel} />
          </div>
        </nav>
      </Dialog>
    </>
  );
}
