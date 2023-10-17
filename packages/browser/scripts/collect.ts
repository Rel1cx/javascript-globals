import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { autoclosing } from "@globals/tools";
import { type GlobalDefinition, isGlobalPropertyDescriptors } from "@globals/types";
import path from "pathe";
import { type BrowserType, chromium, firefox, webkit } from "playwright";

async function detectGlobals(browserType: BrowserType) {
    await using browser = autoclosing(await browserType.launch());

    const page = await browser.newPage();
    await page.goto("about:blank");
    const globalPropertyDescriptors = await page.evaluate("Object.getOwnPropertyDescriptors(globalThis)");

    if (!isGlobalPropertyDescriptors(globalPropertyDescriptors)) {
        throw new TypeError("failed to retrieve global property descriptors");
    }

    return Object.entries(globalPropertyDescriptors)
        .reduce<GlobalDefinition>((acc, [key, descriptor]) => {
            // when writable is not specified, fallback to "writable"
            if (descriptor.writable !== undefined && !descriptor.writable) {
                return { ...acc, [key]: "readonly" };
            }

            return { ...acc, [key]: "writable" };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        }, Object.create(null));
}

async function main() {
    const browsers = [chromium, firefox, webkit];
    const [chromiumGlobals, firefoxGlobals, webkitGlobals] = await Promise.all(browsers.map(detectGlobals));
    const uniqueGlobals = { ...webkitGlobals, ...firefoxGlobals, ...chromiumGlobals };

    console.log(`collected ${Object.keys(uniqueGlobals).length} globals`);

    const dirname = path.dirname(fileURLToPath(import.meta.url));
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(
        path.resolve(dirname, "../src/globals.ts"),
        [
            "// This file is auto-generated by running `pnpm run collect`",
            "// DO NOT EDIT THIS FILE MANUALLY",
            "",
            'import type { GlobalDefinition } from "@globals/types";',
            "",
            "export const browserGlobals = {",
            ...Object.entries(uniqueGlobals).map(([key, value]) => `    "${key}": "${value}",`),
            "} as const satisfies GlobalDefinition;",
            "",
        ].join("\n"),
    );

    console.log("wrote to src/globals.ts");
}

main();
