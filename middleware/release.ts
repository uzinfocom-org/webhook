import Event from "../event.ts";
import { ReleaseEvent } from "../deps.ts";

export default async (event: ReleaseEvent) => {
  const message = new Event();

  message.setEvent("release");
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setAuthor(event.sender.login);
  message.setLink(event.release.html_url);
  message.setDescription(
    `A new release has been published. Don't forget to check out and test it!`,
  );

  await message.push();
};
