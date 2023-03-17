import Event from "../event.ts";
import { PushEvent } from "../deps.ts";

export default async (event: PushEvent) => {
  const message = new Event();

  message.setEvent("push");
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setLink(event.compare);
  message.setAuthor(event.sender.login);
  message.setDescription(
    `A new commit has been pushed to ${
      event.ref.split("/").pop()
    } at ${event.repository.name}. `,
  );

  await message.push();
};
