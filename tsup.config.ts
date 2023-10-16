import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: true,
    entry: ["./src/index.ts"],
    format: ["cjs", "esm"],
    minify: false,
    outDir: "dist",
    platform: "node",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: false,
    sourcemap: false,
    splitting: false,
    target: "node18",
    treeshake: true,
    tsconfig: "./tsconfig.build.json",
}));
