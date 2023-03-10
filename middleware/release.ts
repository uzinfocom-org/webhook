import bot from "../bot.ts";
import { ReleaseEvent } from "../deps.ts";

export default async (event: ReleaseEvent) => {
  const { release } = event;
  await bot.push(
    `📦 <b>Release</b> ${release.name} ${release.tag_name}`,
    release.html_url,
  );
};
