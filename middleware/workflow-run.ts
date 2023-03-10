import bot from "../bot.ts";
import { WorkflowRunEvent } from "../deps.ts";

export default async (event: WorkflowRunEvent) => {
  const { workflow_run } = event;
  if (!workflow_run.conclusion) return;
  if (workflow_run.conclusion === "success") {
    await bot.push(
      `🔨 <b>Workflow</b> of ${workflow_run.repository.name} ${workflow_run.name} completed successfully!`,
      workflow_run.html_url,
    );
  } else {
    await bot.push(
      `🔨 <b>Workflow</b> of ${workflow_run.repository.name} ${workflow_run.name} ${workflow_run.conclusion}`,
    );
  }
};
