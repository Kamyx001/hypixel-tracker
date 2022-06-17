import Tracker from "../Tracker";
import DiscordJS, { Intents } from "discord.js";
import CommandManager from "./CommandManager";
import Help from "./commands/Help";
import botConfig from "./botConfig.json";
import AddPlayer from './commands/AddPlayer';
import players from '../players.json';

export default class Bot {
  private client: DiscordJS.Client;
  private commandManager: CommandManager;
  //@ts-ignore
  private tracker: Tracker;

  constructor( token: string, tracker: Tracker) {
    this.tracker = tracker;
    this.commandManager = new CommandManager( [
      new Help,
      new AddPlayer
    ] );

    this.client = new DiscordJS.Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
      ]
    });

    this.client.on('ready', () => {
      this.client.user!.setActivity({ name: `${players.length} players`, type: 'WATCHING' });
      console.log(`Logged in as ${this.client.user?.tag}!`)
      tracker.sendMessageToAllWebhooks(`Tracker initialized for ${players.length} players.`);
    });

    this.messageCreate();
    this.client.login(token);
  }

  private messageCreate(): void {
    this.client.on('messageCreate', (message) => {
      if (message.author.bot)
        return;
      if (message.content.startsWith(botConfig.prefix)) {
        const [commandName, ...args] = message.content.slice(1).split(/ +/);
        const command = this.commandManager.getCommand(commandName);
        if (command) {
          if (command.isEnabled()) {
            if (command.isOwnerOnly() && !this.client.user?.bot) {
              message.channel.send("This command is owner only.");
              return;
            }
            command.run(message, args, { commands: this.commandManager.getCommands(), tracker: this.tracker });
          } else {
            message.channel.send("This command is disabled.");
          }
        } else {
          message.channel.send(`Command not found. For a list of commands, use ${botConfig.prefix}help.`);
        }
      }
    });
  }
}