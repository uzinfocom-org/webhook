/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { Bot, InlineKeyboard, on, webhooks } from "./deps.ts";

const env = Deno.env.toObject();
const channel = env["CHANNEL"];
const bot = new Bot(env["TOKEN"] || "");

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
);
