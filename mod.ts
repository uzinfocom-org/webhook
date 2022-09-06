/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { Bot, webhooks, on } from "./deps.ts";

const env = Deno.env.toObject();
const channel = env["CHANNEL"];
const bot = new Bot(env["TOKEN"] || "");

webhooks()(
  on("push", async (event) => {
    const { ref, commits, repository } = event;
    const branch = ref.split("/").pop();
    const { name } = repository;
    const commit = commits[0];
    const { message, url } = commit;
    const text = `Pushed to ${branch} at ${name} - ${message} ${url}`;
    await bot.api.sendMessage(channel, text);
  }),
  on("issues", ({ issue }, _context) => {
    const text = `Issue #${issue.number} was ${issue.body}`;
    bot.api.sendMessage(channel, text).then();
  }),
  on("issue_comment", ({ issue, comment }, _context) => {
    const text = `@${comment.user.login} commented on issue #${issue.number}: ${comment.body}`;
    bot.api.sendMessage(channel, text).then();
  }),
  // deployment
  on("deployment", ({deployment}, _context) => {
    const text = `Deployment #${deployment.id} was ${deployment.environment}`;
    bot.api.sendMessage(channel, text).then();
  }),
);
