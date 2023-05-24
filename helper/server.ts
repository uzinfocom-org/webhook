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

// TODO: Implement telegram bot
// export const bot = new Bot(env["TOKEN"] || "");
// export const handle = webhookCallback(bot, "std/http");

export default <C extends Context>(
  config: Config,
  eventHandlers: ReadonlyArray<EventHandler<C>>,
) => {
  // deno-lint-ignore no-explicit-any
  return async (fetchEvent: any) => {
    const startTime = Date.now();

    const request: Request = fetchEvent.request;

    try {
      const { event, signature } = parseHeaders(request.headers);

      if (config.secret && !signature) {
        throw new Error("Unsigned request");
      }

      const payload = await fetchPayload(request);

      if (config.secret && signature) {
        verifySignature(payload, signature, config.secret);
      } else {
        console.warn(`Skipping signature validation...`);
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
