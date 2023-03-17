import Event from "../event.ts";
import { PublicEvent } from "../deps.ts";

export default async (event: PublicEvent) => {
  const message = new Event();

  message.setEvent("publicize");
  message.setRepository(event.repository.name, event.repository.owner.login);
  message.setAuthor(event.sender.login);
  message.setLink(event.repository.html_url);
  message.setDescription(
    `A repository has been made public. Please check it out!`,
  );

  await message.push();
};
