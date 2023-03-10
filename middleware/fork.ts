import bot from "../bot.ts";
import { ForkEvent } from "../deps.ts";

export default async (event: ForkEvent) => {
  const { forkee } = event;
  await bot.push(
    `🍴 <b>Forked</b> ${forkee.full_name} to ${forkee.owner.login}`,
  );
};
