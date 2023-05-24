import bot from "../helper/bot.ts";
import { PublicEvent } from "../deps.ts";

export default async (event: PublicEvent) => {
  const { repository } = event;
  await bot.push(
    `🔓 <b>Public</b> ${repository.full_name}`,
  );
};
