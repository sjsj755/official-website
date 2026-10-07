"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  /** 受控开关：true → showModal()，false → close() */
  open: boolean;
  /** 任何途径（Esc / 遮罩 / 调用方）触发的关闭都回到这里，状态由父级收敛 */
  onClose: () => void;
  /** 无障碍标题元素 id（弹窗内 h2 等），映射 aria-labelledby */
  labelledBy?: string;
  /** 面板样式：定位（如右侧抽屉）、尺寸、动画由此传入；
   *  遮罩样式用 backdrop: 前缀（如 backdrop:bg-black/60） */
  className?: string;
  children: ReactNode;
};

/** 通用模态弹窗：原生 <dialog>.showModal() 封装（替代 Radix Dialog，
 *  §五 首页 JS 预算决策）。焦点圈定与 Esc 由浏览器原生提供；本组件补齐：
 *  受控开关、关闭后焦点归还触发者、背景滚动锁、点遮罩关闭。
 *  打开动画由 className 内的 animate-* 提供（如 animate-drawer-in），
 *  关闭为立即收起（无退场动画）。 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  className,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // 受控开关同步到原生 dialog
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (!el.open) {
        // 记录打开前的焦点元素，关闭后归还
        returnFocusRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        el.showModal();
      }
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  // 关闭后把焦点归还触发者（Radix 的默认行为，原生需自理）
  useEffect(() => {
    if (open) return;
    const el = returnFocusRef.current;
    if (el) {
      el.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  // Esc（cancel）与原生 close 事件统一走受控 onClose
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const handleClose = () => onClose();
    el.addEventListener("cancel", handleCancel);
    el.addEventListener("close", handleClose);
    return () => {
      el.removeEventListener("cancel", handleCancel);
      el.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  // 打开期间锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-modal={true}
      className={className}
      onPointerDown={(event) => {
        // 点遮罩时 target 是 dialog 自身（内容之外），据此关闭
        if (event.target === ref.current) onClose();
      }}
    >
      {/* 内容包裹层：遮罩点击判定不受面板内边距空白影响 */}
      <div className="flex h-full w-full flex-col">{children}</div>
    </dialog>
  );
}
