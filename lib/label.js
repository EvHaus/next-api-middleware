import { makeMiddlewareExecutor } from "./executor.js";
import { isValidMiddleware, isValidMiddlewareArray } from "./validation.js";

/** @typedef {import("./index.js").LabeledMiddleware} LabeledMiddleware */
/** @typedef {import("./index.js").Middleware} Middleware */

/**
 * @template {LabeledMiddleware} T
 * @param {T} middleware
 * @param {Array<keyof T>} defaults
 * @returns
 */
export function label(middleware, defaults = []) {
  // Check signatures
  isValidMiddlewareArray(Object.values(middleware).flat(), true);

  /**
   * Receive chosen middleware (either names or literal middleware functions)
   * @param {Array<Array<keyof T> | Middleware | Middleware[]>} chosenMiddleware
   */
  return function curryMiddlewareChoices(...chosenMiddleware) {
    /** @type {Array<Middleware>} */
    const middlewareFns = [];

    // Load middleware for each choice
    for (const choice of [...defaults, ...chosenMiddleware]) {
      // Choice is the name of a registered function, get from registered middleware
      if (typeof choice === "string") {
        const fn = middleware[choice];
        if (!fn) {
          throw new Error(`Middleware "${choice}" not available`);
        }

        // Add middleware function or group to array
        middlewareFns.push(...(Array.isArray(fn) ? fn : [fn]));
        continue;
      }

      if (Array.isArray(choice) && isValidMiddlewareArray(choice, true)) {
        // Choice is an array of middleware functions
        middlewareFns.push(...choice);
        continue;
      }

      if (isValidMiddleware(choice, true)) {
        // Choice is a middleware function, add directly to array
        middlewareFns.push(choice);
        continue;
      }
    }

    // Make executor
    return makeMiddlewareExecutor(middlewareFns);
  };
}
