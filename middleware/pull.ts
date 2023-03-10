import bot from "../bot.ts";
import { PullRequestEvent } from "../deps.ts";

export default async (event: PullRequestEvent) => {
  const { action, pull_request, repository } = event;
  const { title, html_url } = pull_request;
  const { name } = repository;
  const text = `📦 <b>${action} PR at ${name}</b>\n\n${title}`;
  await bot.push(text, html_url);
};
