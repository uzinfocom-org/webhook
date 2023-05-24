// Middleware
import triggers from "./middleware/mod.ts";

// GitHub Webhook & Http server
import { serve, webhooks } from "../deps.ts";

const env = Deno.env.toObject();
// TODO: Implement telegram bot
// export const bot = new Bot(env["TOKEN"] || "");
// export const handle = webhookCallback(bot, "std/http");

export default async () => {
  await console.log("[INFO]", `bot is starting on ${env["HOST"]}`);
  await serve((req: Request) => { // async
    const url = new URL(req.url);

    if (req.method == "POST") {
      switch (url.pathname) {
        case "/bot":
          try {
            return new Response("Done. Set");
          } catch (err) {
            console.error(err);
            return new Response("Couldn't succeed handling bot request");
          }
        case "/webhook":
          try {
            return webhooks()(...triggers);
          } catch (err) {
            console.error(err);
            return new Response("Nope, GitHub webhook isn't working...");
          }
        default:
          return new Response("What you're trying to post?");
      }
    }

    switch (url.pathname) {
      case "/webhook":
        try {
          // await bot.api.setWebhook(`https://${url.hostname}/bot`);
          return new Response("Done. Set");
        } catch (_) {
          return new Response("Couldn't succeed with installing webhook");
        }
      default:
        return Response.redirect("https://t.me/xeonittebot", 302);
    }
  });
};
