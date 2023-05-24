/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import triggers from "./middleware/mod.ts";
import server from "./helper/server.ts";
import { Config, Context, EventHandler } from "./hook.ts";

/* Listens to `fetch` events and handles requests from GitHub */
export function webhooks<C extends Context = Context>(config: Config = {}) {
  return (...eventHandlers: ReadonlyArray<EventHandler<C>>) => {
    addEventListener("fetch", server<C>(config, eventHandlers));
  };
}

const config: Config = {
  secret: Deno.env.get("WEBHOOK_SECRET") || undefined,
};

// Start the server
await webhooks(config)(...triggers);
