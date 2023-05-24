// GitHub Webhook
export { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";
export type { Context as GCTX } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";
export { serve } from "https://deno.land/std@0.188.0/http/server.ts";

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
