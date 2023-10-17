/* eslint-disable functional-core/purity */
import "core-js/modules/esnext.symbol.dispose.js";
import "core-js/modules/esnext.symbol.async-dispose.js";
import "core-js/modules/esnext.disposable-stack.constructor.js";

export function autoclosing<T extends { close: () => Promise<void> }>(
    target: T,
): T & { [Symbol.asyncDispose]: () => Promise<void> } {
    return Object.assign(target, {
        async [Symbol.asyncDispose]() {
            await target.close();
        },
    });
}
