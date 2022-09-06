/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { Bot, webhooks, on } from "./deps.ts";

const env = Deno.env.toObject();
const channel = env["CHANNEL"];
const bot = new Bot(env["TOKEN"] || "");

webhooks()(
  // ping
  on("ping", async () => {
    await bot.api.sendMessage(channel, "GitHub Ping from Ping Webhook");
  }),
  on("push", async (event) => {
    const { ref, commits, repository } = event;
    const branch = ref.split("/").pop();
    const { name } = repository;
    const commit = commits[0];
    const { message, url } = commit;
    const text = `Pushed to ${branch} at ${name} - ${message} ${url}`;
    await bot.api.sendMessage(channel, text);
  }),
  on("issues", async ({ issue }, _context) => {
    const text = `Issue #${issue.number} was ${issue.body}`;
    await bot.api.sendMessage(channel, text).then();
  }),
  on("issue_comment", async ({ issue, comment }, _context) => {
    const text = `@${comment.user.login} commented on issue #${issue.number}: ${comment.body}`;
    await bot.api.sendMessage(channel, text);
  }),
  // deployment
  on("deployment", async ({deployment}, _context) => {
    const text = `Deployment #${deployment.id} was ${deployment.environment}`;
    await bot.api.sendMessage(channel, text);
  }),
);
