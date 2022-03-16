/** @typedef {import("./index.js").Middleware} Middleware */

/**
 * @param {*} input
 * @param {boolean} [throwOnFailure]
 * @returns {input is Middleware}
 */
export function isValidMiddleware(input, throwOnFailure = false) {
  const valid = typeof input === "function" && input.length === 3;
  if (!valid && throwOnFailure) {
    throw new Error("Invalid middleware");
  }
  return valid;
}

/**
 * @param {Array<*>} input
 * @param {boolean} [throwOnFailure]
 * @returns {input is Array<Middleware>}
 */
export function isValidMiddlewareArray(input, throwOnFailure = false) {
  return input.every((item) => isValidMiddleware(item, throwOnFailure));
}
