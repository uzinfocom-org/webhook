/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { Bot, InlineKeyboard, on, webhooks } from "./deps.ts";

// Initializing instances
const env = Deno.env.toObject();
const channel = env["CHANNEL"];
const bot = new Bot(env["TOKEN"] || "");

// Telegram sendMessage API Request
async function push(message: string, link = "") {
  switch (link) {
    case "":
      return await bot.api.sendMessage(channel, message, {
        parse_mode: "HTML",
      });
    default:
      return await bot.api.sendMessage(channel, message, {
        parse_mode: "HTML",
        reply_markup: new InlineKeyboard().url("View it on GitHub", link),
      });
  }
}

webhooks()(
  on("ping", async () => {
    await push("GitHub Ping from Webhook");
  }),
  on("push", async (event) => {
    const { ref, commits, repository } = event;
    const branch = ref.split("/").pop();
    const { name } = repository;
    const commit = commits[0];
    const { message, url } = commit;
    const text = `📦 <b>Pushed to ${branch} at ${name}</b>\n\n${message}`;
    await push(text, url);
  }),
  on("pull_request", async (event) => {
    const { action, pull_request, repository } = event;
    const { title, html_url } = pull_request;
    const { name } = repository;
    const text = `📦 <b>${action} PR at ${name}</b>\n\n${title}`;
    await push(text, html_url);
  }),
  on("create", async (event) => {
    const { ref_type, ref, repository } = event;
    const { name } = repository;
    const text = `📦 <b>Created ${ref_type} at ${name}</b>\n\n${ref}`;
    await push(text);
  }),
  on("issues", async ({ issue }, _context) => {
    await push(
      `⚠️ <b>New issue:</b> ${issue.title}\n\n${issue.body}`,
      issue.html_url,
    );
  }),
  on("issue_comment", async ({ issue, comment }, _context) => {
    await push(
      `📢 <b>New comment on issue:</b>\n\n<u>${issue.title}</u>\n<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
      comment.html_url,
    );
  }),
  on("deployment", async ({ deployment }, _context) => {
    await push(
      `🎛 <b>${deployment.environment}</b> deployment with <b>#${deployment.id}</b> has been deployed!`,
    );
  }),
  // discussion
  on("discussion", async ({ discussion }, _context) => {
    await push(
      `📢 <b>New discussion:</b> ${discussion.title}\n\n${discussion.body}`,
      discussion.html_url,
    );
  }),
  on("discussion_comment", async ({ discussion, comment }, _context) => {
    await push(
      `📢 <b>New comment on discussion:</b>\n\n<u>${discussion.title}</u>\n<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
      comment.html_url,
    );
  }),
  // fork
  on("fork", async ({ forkee }, _context) => {
    await push(
      `🍴 <b>Forked</b> ${forkee.full_name} to ${forkee.owner.login}`,
    );
  }),
  // from private to public
    on("public", async ({ repository }, _context) => {
    await push(
      `🔓 <b>Public</b> ${repository.full_name}`,
    );
  }),
  // release
  on("release", async ({ release }, _context) => {
    await push(
      `📦 <b>Release</b> ${release.name} ${release.tag_name}`,
      release.html_url,
    );
  }),
  on("star", async ({ repository, sender }, _context) => {
      await push(
        `⭐️ <a href="${sender.html_url}">${sender.login}</a> <b>starred</b> ${repository.full_name}`,
      );
  }),
  on("workflow_run", async ({ workflow_run }, _context) => {
    console.log(workflow_run.conclusion)
    await push(
      `🔨 <b>Workflow</b> of ${workflow_run.repository.name} ${workflow_run.name} ${workflow_run.conclusion}`,
      workflow_run.html_url,
    );
  })
);
