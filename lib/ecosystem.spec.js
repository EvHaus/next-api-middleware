import { use } from "./index.js";
import cors from "cors";

/** @typedef {import("next").NextApiRequest} NextApiRequest */
/** @typedef {import("next").NextApiResponse} NextApiResponse */
/** @typedef {import("./index").NextMiddleware} NextMiddleware */

describe("cors", () => {
  it("works alongside Next Middleware", async () => {
    expect.assertions(3);

    const middleware = use(
      /** @type {NextMiddleware} */ async (_req, res, next) => {
        // No CORS headers yet
        expect(res.hasHeader("Access-Control-Allow-Origin")).toBe(false);
        await next();
        // CORS headers applied
        expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
      },
      cors()
    );

    // Create mocks
    const handler = jest.fn(async (_req, res) => {
      // API handler should have CORS headers
      expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
    });

    // Execute middleware with handler
    await middleware(handler)(
      /** @type {NextApiRequest} */ ({}),
      /** @type {NextApiResponse} */ ({})
    );
  });
});
