import Tracker from "./Tracker";
import DiscordJS, { Intents } from "discord.js";

export default class Bot {
  private client: DiscordJS.Client;
  //@ts-ignore
  private tracker: Tracker;

  constructor( token: string, tracker: Tracker) {
    this.tracker = tracker;

    this.client = new DiscordJS.Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
      ]
    });

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user?.tag}!`)
    });

    this.client.login(token);
  }
}