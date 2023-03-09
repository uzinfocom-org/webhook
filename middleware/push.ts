import { PushEvent } from '../deps.ts'

export default async (event: PushEvent) => {
    const { ref, commits, repository } = event;
    const branch = ref.split("/").pop();
    const { name } = repository;
    const commit = commits[0];
    const { message, url } = commit;
    const text = `📦 <b>Pushed to ${branch} at ${name}</b>\n\n${message}`;
    await bot.push(text, url);
}