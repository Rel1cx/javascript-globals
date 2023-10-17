// eslint-disable-next-line functional-core/purity
import * as v from "valibot";

export type GlobalType = "readonly" | "writable";

export type GlobalDefinition = Record<string, GlobalType>;

export type GlobalPropertyDescriptors = Record<string, PropertyDescriptor>;

export function isGlobalDefinition(value: unknown): value is GlobalDefinition {
    return v.is(v.record(v.string(), v.union([v.literal("readonly"), v.literal("writable")])), value);
}

export function isGlobalPropertyDescriptors(value: unknown): value is GlobalPropertyDescriptors {
    return v.is(
        v.record(
            v.string(),
            v.object({
                configurable: v.optional(v.boolean()),
                enumerable: v.optional(v.boolean()),
                value: v.optional(v.unknown()),
                writable: v.optional(v.boolean()),
            }),
        ),
        value,
    );
}
