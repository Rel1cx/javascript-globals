import { isGlobalDefinition } from "@globals/types";
import { describe, expect, it } from "vitest";

import { browserGlobals } from "./globals";

describe("test browserGlobals", () => {
    it("should be a GlobalDefinition", () => {
        expect(isGlobalDefinition(browserGlobals)).toBe(true);
    });
});
