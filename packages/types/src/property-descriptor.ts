// eslint-disable-next-line functional-core/purity
import * as v from "valibot";

export const PropertyDescriptorSchema = v.object({
    configurable: v.optional(v.boolean()),
    enumerable: v.optional(v.boolean()),
    value: v.optional(v.unknown()),
    writable: v.optional(v.boolean()),
});

export function isPropertyDescriptor(value: unknown): value is PropertyDescriptor {
    return v.is(PropertyDescriptorSchema, value);
}
