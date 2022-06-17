import Tracker from "../Tracker";
import DiscordJS, { Intents } from "discord.js";
import CommandManager from "./CommandManager";
import Help from "./commands/Help";
import AddPlayer from './commands/AddPlayer';
import players from '../players.json';
import AddWebhook from "./commands/AddWebhook";
import RemoveWebhook from "./commands/RemoveWebhook";
import Players from './commands/Players';
import ApiKeys from "./commands/ApiKeys";
import AddKey from "./commands/AddKey";

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
      this.client.user!.setActivity({ name: `${players.length} players`, type: 'WATCHING', shardId: 0 });
      console.log(`Logged in as ${this.client.user?.tag}!`)
      tracker.sendMessageToAllWebhooks(`Tracker initialized for ${players.length} players with ${tracker.getApiKeys().length} api keys.`);
    });

    new CommandManager( [
      new Help,
      new AddPlayer,
      new AddWebhook,
      new RemoveWebhook,
      new Players,
      new ApiKeys,
      new AddKey,
    ], this.client, this.tracker );
    
    this.messageCreate();
    this.client.login(token);
  }

  private messageCreate(): void {
    
  }
}