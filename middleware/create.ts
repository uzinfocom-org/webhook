import Event from "../event.ts";
import { CreateEvent } from "../deps.ts";

export default async (event: CreateEvent) => {
  const message = new Event();

  message.setEvent("create");
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setLink(event.repository.html_url);
  message.setAuthor(event.sender.login);
  message.setDescription(
    `A new tag or branch has been created on repository. `,
  );

  await message.push();
};
