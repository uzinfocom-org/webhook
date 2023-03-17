import Event from "../event.ts";
import { DeploymentEvent, GCTX } from "../deps.ts";

export default async (event: DeploymentEvent, _context: GCTX) => {
  await bot.push(
    `🎛 <b>${deployment.environment}</b> deployment with <b>#${deployment.id}</b> has been deployed!`,
    deployment.repository_url + "/deployments",
  );

  const message = new Event();

    message.setEvent("deployment");
    message.setRepository(event.repository.name, event.repository.owner.login);
    message.setLink(event.repository.html_url);

};
