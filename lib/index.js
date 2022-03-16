/**
 * @callback NextMiddleware
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @param {() => Promise<void>} next
 */

/**
 * @template [Request=import("http").IncomingMessage]
 * @template [Response=import("http").ServerResponse]
 * @callback ExpressMiddleware
 * @param {Request} req
 * @param {Response} res
 * @param {(error?: any) => void | Promise<void>} next
 * @returns {void}
 */

/**
 * @typedef {NextMiddleware | ExpressMiddleware} Middleware
 */

/**
 * @typedef {Object.<string, Middleware | Array<Middleware>>} LabeledMiddleware
 */

export * from "./label";
export * from "./use";
