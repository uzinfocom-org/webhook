// GitHub Webhook
export { on } from "./hook/mod.ts";
export type { Context as GCTX } from "./hook/mod.ts";

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
  // For production
  // } from "npm:@octokit/webhooks-types/schema.d.ts@^6.11.0";
  // For development
} from "./schema.ts";
