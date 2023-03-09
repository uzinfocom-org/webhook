import { Bot as Grammy, InlineKeyboard } from "./deps.ts";

const env = Deno.env.toObject();

export class Bot {
  private _channels: (string | number)[];
  private _instance: Grammy;

  constructor(token: string = env["TOKEN"], channel: string = "") {
    if (!token) {
        throw new Error("No token provided");
    } else {
        this._instance = new Grammy(token);
    }

    if (channel) {
      this._channels.push(channel);
    }

    if (env["WEBHOOK"]) {
      this._channels.push(env["WEBHOOK"]!);
    }
  }

  addChannel(channel: string | number) {
    this._channels.push(channel);
  }

  /**
   * Send a message to a channel
   * @param channel Channel to send notification
   * @param message Message to deliver to the channel
   * @param link Some link to attach to the message
   * @returns void
   */
  public send(channel: string | number, message: string, link = "") {
    switch (link) {
      case "":
        return this._instance.api.sendMessage(channel, message, {
          parse_mode: "HTML",
        });
      default:
        return this._instance.api.sendMessage(channel, message, {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().url("View it on GitHub", link),
        });
    }
  }

  /**
   * Send a message to all channels
   * @param message Message to deliver to the channel
   * @param link Some link to attach to the message
   */
  async push(message: string, link = "") {
    for (const channel of this._channels) {
      await this.send(channel, message, link);
    }
  }
}
