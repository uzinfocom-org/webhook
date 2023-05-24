import bot from "../helper/bot.ts";
import { DiscussionCommentEvent, GCTX } from "../deps.ts";

export default async (event: DiscussionCommentEvent, _context: GCTX) => {
  const { discussion, comment } = event;
  await bot.push(
    `📢 <b>New comment on discussion:</b>\n\n<u>${discussion.title}</u>\n<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
    comment.html_url,
  );
};
