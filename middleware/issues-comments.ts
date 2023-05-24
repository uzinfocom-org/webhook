import bot from "../helper/bot.ts";
import { GCTX, IssueCommentEvent } from "../deps.ts";

export default async (event: IssueCommentEvent, _context: GCTX) => {
  const { issue, comment } = event;
  await bot.push(
    `📢 <b>New comment on issue:</b>` +
      `\n` +
      `\n` +
      `<u>${issue.title}</u>` +
      `\n` +
      `<a href="${comment.user.html_url}">@${comment.user.login}</a>: ${comment.body}`,
    comment.html_url,
  );
};
