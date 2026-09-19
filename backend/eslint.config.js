import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      '**/generated/**',
      "**/prisma/generated/**"
    ]
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.test.js"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.jest } },
]);
