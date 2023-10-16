import fs from "node:fs";
import path from "node:path";

import { type BrowserType, chromium, firefox, webkit } from "playwright";

import { autoclosing } from "./lib/autoclosing";

async function detectGlobals(browserType: BrowserType): Promise<string[]> {
    await using browser = autoclosing(await browserType.launch());

    const page = await browser.newPage();
    await page.goto("about:blank");
    const globals = await page.evaluate("Object.keys(Object.getOwnPropertyDescriptors(globalThis))");

    if (!Array.isArray(globals)) {
        throw new TypeError("failed to retrieve globals");
    }

    return globals as string[];
}

async function main() {
    const browsers = [chromium, firefox, webkit];
    const globals = await Promise.all(browsers.map(detectGlobals));
    const flattenedGlobals = globals.flat();
    const uniqueGlobals = [...new Set(flattenedGlobals)];

    console.log(`collected ${uniqueGlobals.length} globals`);

    fs.writeFileSync(
        path.resolve(__dirname, "../src/globals.ts"),
        [
            "// This file is auto-generated by running `pnpm run collect`",
            "// DO NOT EDIT THIS FILE MANUALLY",
            "",
            "export const browserGlobals = [",
            ...uniqueGlobals.map((global) => `    '${global}',`),
            "] as const;",
            "",
            "export type BrowserGlobalKey = typeof browserGlobals[number];",
            "",
        ].join("\n"),
    );

    console.log("wrote to src/globals.ts");
}

main();
