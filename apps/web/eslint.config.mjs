import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Komponen registry shadcn dan mapcn dipakai apa adanya. Aturan React
    // Compiler di file itu bukan milik kode aplikasi.
    "components/ui/**",
  ]),
]);

export default eslintConfig;
