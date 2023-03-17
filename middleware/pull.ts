import Event from "../event.ts";
import { PullRequestEvent } from "../deps.ts";

export default async (event: PullRequestEvent) => {
  const message = new Event();

  message.setEvent("pull");
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setLink(event.pull_request.html_url);
  message.setAuthor(event.sender.login);
  message.setDescription(
    `${event.sender.login} ${event.action} a pull request at ${event.repository.name}: ${event.pull_request.title}`,
  );

  await message.push();
};
