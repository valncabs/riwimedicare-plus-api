import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "dist/**",
            "src/config/config.js",
            "src/migrations/**",
            "src/seeders/**"
        ]
    },

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.node
        }
    },

    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs"
        }
    },

    tseslint.configs.recommended
]);