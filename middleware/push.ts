import bot from "../helper/bot.ts";
import { PushEvent } from "../deps.ts";

export default async (event: PushEvent) => {
  const { ref, commits, repository } = event;
  const branch = ref.split("/").pop();
  const { name } = repository;
  const commit = commits[0];
  const { message, url } = commit;
  const text = `📦 <b>Pushed to ${branch} at ${name}</b>\n\n<b>Summary</b>\n${message}`;
  return await bot.push(text, url);
};
