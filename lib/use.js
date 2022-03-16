import { makeMiddlewareExecutor } from "./executor.js";
import { isValidMiddlewareArray } from "./validation.js";

/** @typedef {import("./index.js").Middleware} Middleware */

/**
 * @param  {...(Middleware | Middleware[])} middleware
 * @returns
 */
export function use(...middleware) {
  // Flatten middleware groups
  const middlewareFns = middleware.flat();

  // Check signatures
  isValidMiddlewareArray(middlewareFns, true);

  // Make executor
  return makeMiddlewareExecutor(middlewareFns);
}
