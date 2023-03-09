/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { on, webhooks } from "./deps.ts";
import { Bot } from "./bot.ts";
import { 
  PushEvent, 
  PullRequestEvent,
  CreateEvent,
  IssuesEvent,
  IssueCommentEvent,
  DeploymentEvent,
  DiscussionEvent,
  DiscussionCommentEvent,
  ForkEvent,
  PublicEvent,
  ReleaseEvent,
  StarEvent,
  // WorkflowRunEvent,
} from "./deps.ts";

const bot = new Bot();

webhooks()(
  on("ping", async () => {
    await bot.push("GitHub Ping from Webhook");
  }),

  on("push", async (event: PushEvent) => {
    const { ref, commits, repository } = event;
    const branch = ref.split("/").pop();
    const { name } = repository;
    const commit = commits[0];
    const { message, url } = commit;
    const text = `📦 <b>Pushed to ${branch} at ${name}</b>\n\n${message}`;
    await bot.push(text, url);
  }),

  on("pull_request", async (event: PullRequestEvent) => {
    const { action, pull_request, repository } = event;
    const { title, html_url } = pull_request;
    const { name } = repository;
    const text = `📦 <b>${action} PR at ${name}</b>\n\n${title}`;
    await bot.push(text, html_url);
  }),

  on("create", async (event: CreateEvent) => {
    const { ref_type, ref, repository } = event;
    const { name } = repository;
    const text = `📦 <b>Created ${ref_type} at ${name}</b>\n\n${ref}`;
    await bot.push(text);
  }),

  on("issues", async ({ issue }: IssuesEvent, _context) => {
    await bot.push(
      `⚠️ <b>New issue:</b> ${issue.title}\n\n${issue.body}`,
      issue.html_url,
    );
  }),

  on("issue_comment", async ({ issue, comment }: IssueCommentEvent, _context) => {
    await bot.push(
      `📢 <b>New comment on issue:</b>\n\n<u>${issue.title}</u>\n<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
      comment.html_url,
    );
  }),

  on("deployment", async ({ deployment }: DeploymentEvent, _context) => {
    await bot.push(
      `🎛 <b>${deployment.environment}</b> deployment with <b>#${deployment.id}</b> has been deployed!`,
      deployment.statuses_url,
    );
  }),

  // discussion
  on("discussion", async ({ discussion }: DiscussionEvent, _context) => {
    await bot.push(
      `📢 <b>New discussion:</b> ${discussion.title}\n\n${discussion.body}`,
      discussion.html_url,
    );
  }),

  on("discussion_comment", async ({ discussion, comment }: DiscussionCommentEvent, _context) => {
    await bot.push(
      `📢 <b>New comment on discussion:</b>\n\n<u>${discussion.title}</u>\n<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
      comment.html_url,
    );
  }),

  // fork
  on("fork", async ({ forkee }: ForkEvent, _context) => {
    await bot.push(
      `🍴 <b>Forked</b> ${forkee.full_name} to ${forkee.owner.login}`,
    );
  }),
  
  // from private to public
  on("public", async ({ repository }: PublicEvent, _context) => {
    await bot.push(
      `🔓 <b>Public</b> ${repository.full_name}`,
    );
  }),

  // Release
  on("release", async ({ release }: ReleaseEvent, _context) => {
    await bot.push(
      `📦 <b>Release</b> ${release.name} ${release.tag_name}`,
      release.html_url,
    );
  }),
  
  on("star", async ({ repository, sender }: StarEvent, _context) => {
    await bot.push(
      `⭐️ <a href="${sender.html_url}">${sender.login}</a> <b>starred</b> ${repository.full_name}`,
    );
  }),
  
  // on("workflow_run", async ({ workflow_run }: WorkflowRunEvent, _context) => {
  //     if (!workflow_run.conclusion) return;
  //     if (workflow_run.conclusion === "success") {
  //         await bot.push(
  //             `🔨 <b>Workflow</b> of ${workflow_run.repository.name} ${workflow_run.name} completed successfully!`,
  //             workflow_run.html_url,
  //         );
  //     } else {
  //         await bot.push(
  //             `🔨 <b>Workflow</b> of ${workflow_run.repository.name} ${workflow_run.name} ${workflow_run.conclusion}`,
  //         );
  //     }
  // }),
);
