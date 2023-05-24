import bot from "../helper/bot.ts";
import { CreateEvent } from "../deps.ts";

export default async (event: CreateEvent) => {
  const { ref_type, ref, repository } = event;
  const { name } = repository;
  const text = `📦 <b>Created ${ref_type} at ${name}</b>\n\n${ref}`;
  await bot.push(text);
};
