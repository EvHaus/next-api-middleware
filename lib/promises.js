/**
 * @template Result
 * @template Error
 * @typedef {object} ControlledPromise
 * @property {Promise<Result>} promise
 * @property {(value: Result | PromiseLike<Result>) => void} resolve
 * @property {(err: Error) => void} reject
 */

/**
 * @template [Result=void]
 * @template [Error=any]
 * @returns {ControlledPromise<Result, Error>}
 */
export function controlledPromise() {
  // Define variables to hold references to the resolve
  // and reject handlers within a real promise.
  let resolve;
  let reject;

  // Create a promise and assign its actual resolver and rejecter
  // handlers to the reference variables
  const promise = new Promise((actualResolve, actualReject) => {
    resolve = actualResolve;
    reject = actualReject;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

/**
 * @template Result
 * @type {(input: unknown) => input is Promise<Result>}
 */
export function isPromise(input) {
  return typeof input === "object" && input !== null && "then" in input;
}
