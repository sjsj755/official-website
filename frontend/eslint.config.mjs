import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // next-env.d.ts 由 next build 生成（含 triple-slash 引用），不属于源码
    ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
