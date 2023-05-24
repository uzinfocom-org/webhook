// GitHub Webhook
export { on } from "./hook.ts";
export type { Context as GCTX } from "./hook.ts";

// Telegram
export {
  Bot,
  Composer,
  Context,
  InlineKeyboard,
  InputFile,
  webhookCallback,
} from "https://deno.land/x/grammy@v1.16.1/mod.ts";
export type { NextFunction } from "https://deno.land/x/grammy@v1.16.1/mod.ts";

// GitHub Payloads
export type {
  CreateEvent,
  DeploymentEvent,
  DiscussionCommentEvent,
  DiscussionEvent,
  ForkEvent,
  IssueCommentEvent,
  IssuesEvent,
  PublicEvent,
  PullRequestEvent,
  PushEvent,
  ReleaseEvent,
  StarEvent,
  WorkflowRunEvent,
  WebhookEvent,
  WebhookEventMap,
  WebhookEventName,
  // For production
  // } from "npm:@octokit/webhooks-types/schema.d.ts@^6.11.0";
  // For development
} from "./schema.ts";

// Crypto
export { hmac } from "https://deno.land/x/crypto@v0.8.0/hmac.ts";

// Djwt
export { create as createJWT } from "https://deno.land/x/djwt@v2.2/mod.ts";

// Hex
export { encodeToString } from "https://deno.land/std@0.100.0/encoding/hex.ts";
