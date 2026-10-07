/**
 * 交互冒烟测试：验证布局骨架在浏览器中的关键交互。
 * 运行前置：`next build` + `next start`（默认 http://localhost:3200，
 * 可用 SMOKE_BASE_URL 覆盖）。复用本机 Chrome（channel: chrome）。
 * Week 4 将升级为 Playwright E2E（前端设计方案 §12），本脚本为其前身。
 */
import { chromium } from "playwright-core";

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3200";
const results = [];
const pageErrors = [];

function record(name, pass, detail = "") {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function waitForPanel(page, open) {
  await page.waitForFunction(
    (expected) => {
      const p = document.getElementById("desktop-products-menu");
      return p ? p.hidden === !expected : false;
    },
    open,
    { timeout: 3000 },
  );
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  // ---------- 桌面视口 1400x900 ----------
  const desktop = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  desktop.on("pageerror", (e) => pageErrors.push(`desktop pageerror: ${e.message}`));
  desktop.on("console", (m) => {
    if (m.type() === "error") pageErrors.push(`desktop console: ${m.text()}`);
  });

  await desktop.goto(`${BASE}/`, { waitUntil: "networkidle" });

  const trigger = desktop.locator("button[aria-controls='desktop-products-menu']");
  record("桌面导航巨型菜单触发器存在", (await trigger.count()) === 1);

  // 鼠标先移出菜单区，确保 hover 触发器会派发 mouseenter
  await desktop.mouse.move(10, 700);
  await trigger.hover();
  await waitForPanel(desktop, true);
  record("悬停展开巨型菜单", true);

  const linkCount = await desktop
    .locator("#desktop-products-menu a")
    .count();
  record("面板含产品线与联系链接", linkCount >= 4, `${linkCount} 个链接`);

  // 键盘流：焦点在触发器上，Esc 收起
  await trigger.focus();
  await desktop.keyboard.press("Escape");
  await waitForPanel(desktop, false);
  record("Esc 收起巨型菜单", true);

  // 悬停展开后点击面板内链接跳转
  await desktop.mouse.move(10, 700);
  await trigger.hover();
  await waitForPanel(desktop, true);
  await desktop.locator("#desktop-products-menu a").first().click();
  await desktop.waitForURL("**/products");
  record("面板链接跳转 /products", new URL(desktop.url()).pathname === "/products");
  // 鼠标移出菜单区，避免停在原面板坐标触发悬停展开
  await desktop.mouse.move(10, 400);
  await waitForPanel(desktop, false);
  record("跳转后巨型菜单收起", true);

  // 语言切换
  await desktop.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await desktop.getByRole("link", { name: "切换语言" }).click();
  await desktop.waitForURL("**/en");
  record("语言切换跳转 /en", new URL(desktop.url()).pathname === "/en");
  await desktop.close();

  // ---------- 移动视口 480x800 ----------
  const mobile = await browser.newPage({ viewport: { width: 480, height: 800 } });
  mobile.on("pageerror", (e) => pageErrors.push(`mobile pageerror: ${e.message}`));
  mobile.on("console", (m) => {
    if (m.type() === "error") pageErrors.push(`mobile console: ${m.text()}`);
  });

  await mobile.goto(`${BASE}/`, { waitUntil: "networkidle" });
  record(
    "移动端桌面巨型菜单隐藏",
    !(await mobile.locator("#desktop-products-menu").isVisible()),
  );

  const burger = mobile.getByRole("button", { name: "打开菜单" });
  record("汉堡按钮可见", await burger.isVisible());
  await burger.click();
  await mobile.getByRole("dialog").waitFor({ state: "visible" });
  record("抽屉打开", true);

  await mobile.locator("dialog[open] a[href='/contact']").click();
  await mobile.waitForURL("**/contact");
  record("抽屉导航跳转 /contact", new URL(mobile.url()).pathname === "/contact");
  // 原生 dialog 关闭后仍在 DOM（无 open 属性），据此断言收起
  await mobile.waitForFunction(
    () => document.querySelector("dialog[open]") === null,
    null,
    { timeout: 3000 },
  );
  record("跳转后抽屉关闭", true);
  await mobile.close();

  // ---------- 404 ----------
  const nf = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const resp = await nf.goto(`${BASE}/xyz-not-exist`);
  record("未知路径返回 404 状态", resp?.status() === 404, `status=${resp?.status()}`);
  record("404 页面渲染", await nf.getByText("404", { exact: true }).isVisible());
  await nf.close();

  // ---------- 控制台与水合错误 ----------
  record("无页面/控制台错误", pageErrors.length === 0, pageErrors.join(" | ").slice(0, 400));
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} 项通过`);
process.exitCode = failed ? 1 : 0;
