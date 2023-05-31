// GitHub Webhook & Http server
import { Config, Context, EventHandler } from "../hook.ts";
import {
  fetchPayload,
  fetchToken,
  json,
  parseHeaders,
  verifySignature,
} from "../hook.ts";

export { on } from "../hook.ts";

export default <C extends Context>(
  config: Config,
  eventHandlers: ReadonlyArray<EventHandler<C>>,
) => {
  console.log("Resolving the request");

  // deno-lint-ignore no-explicit-any
  return async (fetchEvent: any) => {
    const startTime = Date.now();

    const request: Request = fetchEvent.request;

    try {
      const { event, signature } = parseHeaders(request.headers);

      const payload = await fetchPayload(request);

      if (config.secret && signature) {
        const isValid = verifySignature(payload, signature, config.secret);

        if (!isValid) {
          throw new Error("Invalid signature");
        }
      } else {
        return console.warn(`Secret not set`);
      }

      // @ts-ignore FIXME
      let context: C = {
        installationId: (payload as { installation?: { id: number } })
          .installation?.id,
      };

      if (config.appId && config.privateKey && context.installationId) {
        context = {
          ...context,
          token: await fetchToken(
            config.appId,
            context.installationId,
            config.privateKey,
          ),
        };
      } else {
        console.warn(`Skipping fetching token...`);
      }

      // FIXME: prefer immutability instead
      for (const handler of eventHandlers) {
        context = await handler(event, payload, context) || context;
      }

      await fetchEvent.respondWith(json({ success: true }));
    } catch (error) {
      await fetchEvent.respondWith(
        json({ error }),
        error.status || error.statusCode || error.code || 500,
      );
    }

    console.log(`Done in ${Date.now() - startTime}ms`);
  };
};
