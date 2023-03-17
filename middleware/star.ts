import Event from "../event.ts";
import { StarEvent } from "../deps.ts";

export default async (event: StarEvent) => {
  const message = new Event();

  message.setEvent("star");
  message.setAuthor(event.sender.login);
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setLink(event.repository.html_url);
  message.setDescription(
    `<a href="${event.sender.html_url}">${event.sender.login}</a> <b>starred</b> ${event.repository.full_name}`,
  );

  await message.push();
};
