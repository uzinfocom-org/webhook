// GitHub Webhook
export { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";

// Telegram
export {
  Bot,
  Composer,
  Context,
  InlineKeyboard,
  InputFile,
  webhookCallback,
} from "https://deno.land/x/grammy@v1.11.0/mod.ts";
export type { NextFunction } from "https://deno.land/x/grammy@v1.11.0/mod.ts";
