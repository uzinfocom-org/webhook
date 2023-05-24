import bot from "../helper/bot.ts";
import { StarEvent } from "../deps.ts";

export default async (event: StarEvent) => {
  const { repository, sender } = event;
  await bot.push(
    `⭐️ <a href="${sender.html_url}">${sender.login}</a> <b>starred</b> ${repository.full_name}`,
  );
};
