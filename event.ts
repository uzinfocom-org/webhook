import { Bot } from "./bot.ts";

export default class Event {
  bot: Bot;
  event: string;
  author: string;
  repository: string;
  description: string;
  link?: string;

  constructor() {
    this.bot = new Bot();
    this.event = "";
    this.author = "";
    this.repository = "";
    this.description = "";
    this.link = "";
  }

  public setEvent(event: string) {
    this.event = event;
  }

  public setAuthor(author: string) {
    this.author = author;
  }

  public setRepository(repo: string, owner: string) {
    let name = "";

    if (owner) {
      name += owner;
      name += "/";
    }

    name += repo;

    this.repository = name;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setLink(link: string) {
    this.link = link;
  }

  public render(): string {
    let chunk = "";

    chunk +=
      `📢 <b>New</b> <i>${this.event}</i> <b>event has been triggered!</b>`;
    chunk += `\n`;
    chunk += `\n`;

    if (this.author) {
      chunk += `👤 <b>Author:</b> ${this.author}`;
      chunk += `\n`;
    }

    if (this.repository) {
      chunk += `📦 <b>Repository:</b> ${this.repository}`;
      chunk += `\n`;
    }

    if (this.description) {
      chunk += `📝 <b>Description:</b> ${this.description}`;
      chunk += `\n`;
    }

    return chunk;
  }

  public async push() {
    await this.bot.push(this.render(), this.link);
  }
}
