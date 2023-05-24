// deno-lint-ignore-file no-explicit-any

import { on } from "../deps.ts";

import { default as PushAction } from "./push.ts";
import { default as PullAction } from "./pull.ts";
import { default as CreateAction } from "./create.ts";
import { default as IssuesAction } from "./issues.ts";
import { default as IssuesCommentsAction } from "./issues-comments.ts";
import { default as DeploymentAction } from "./deployment.ts";
import { default as DiscussionAction } from "./discussion.ts";
import { default as DiscussionCommentsAction } from "./discussion-comments.ts";
import { default as ForkAction } from "./fork.ts";
import { default as PublicAction } from "./public.ts";
import { default as ReleaseAction } from "./release.ts";
import { default as StarAction } from "./star.ts";
import { default as WorkflowRunAction } from "./workflow-run.ts";

const triggerList = [
  ["push", PushAction],
  ["pull_request", PullAction],
  ["create", CreateAction],
  ["issues", IssuesAction],
  ["issue_comment", IssuesCommentsAction],
  ["deployment", DeploymentAction],
  ["discussion", DiscussionAction],
  ["discussion_comment", DiscussionCommentsAction],
  ["fork", ForkAction],
  ["public", PublicAction],
  ["release", ReleaseAction],
  ["star", StarAction],
  ["workflow_run", WorkflowRunAction],
];

export default triggerList.map((trigger: any) => on(trigger[0], trigger[1]));
