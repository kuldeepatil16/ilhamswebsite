import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    rules: {},
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);
