import bot from "../bot.ts";
import { GCTX, IssuesEvent } from "../deps.ts";

export default async (event: IssuesEvent, _context: GCTX) => {
  const { issue } = event;
  await bot.push(
    `⚠️ <b>New issue:</b> ${issue.title}` +
      `\n` +
      `\n${issue.body}`,
    issue.html_url,
  );
};
