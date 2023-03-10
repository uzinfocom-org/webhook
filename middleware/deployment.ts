import bot from "../bot.ts";
import { DeploymentEvent, GCTX } from "../deps.ts";

export default async (event: DeploymentEvent, _context: GCTX) => {
  const { deployment } = event;
  await bot.push(
    `🎛 <b>${deployment.environment}</b> deployment with <b>#${deployment.id}</b> has been deployed!`,
    deployment.repository_url + "/deployments",
  );
};
