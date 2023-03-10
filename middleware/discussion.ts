import bot from "../bot.ts";
import { DiscussionEvent, GCTX } from "../deps.ts";

export default async (event: DiscussionEvent, _context: GCTX) => {
  const { discussion } = event;
  await bot.push(
    `📢 <b>New discussion:</b> ${discussion.title}\n\n${discussion.body}`,
    discussion.html_url,
  );
};
