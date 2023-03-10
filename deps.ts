// GitHub Webhook
export { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";
export type { Context as GCTX } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";

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

// GitHub API
// @octokit/webhooks-definitions
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
} from "./schema/mod.ts";
// } from "npm:@octokit/webhooks-definitions/schema.d.ts";
