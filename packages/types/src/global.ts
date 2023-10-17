// eslint-disable-next-line functional-core/purity
import * as v from "valibot";

export type GlobalType = "readonly" | "writable";

export type GlobalDefinition = Record<string, GlobalType>;

export const GlobalDefinitionSchema = v.record(v.string(), v.union([v.literal("readonly"), v.literal("writable")]));

export function isGlobalDefinition(value: unknown): value is GlobalDefinition {
    return v.is(GlobalDefinitionSchema, value);
}
