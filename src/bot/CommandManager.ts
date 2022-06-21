import Command from "./Command";
import DiscordJS from "discord.js";
import botConfig from "./botConfig.json";
import Tracker from "../tracker/Tracker";
export default class CommandManager {
  private commands: Command[];
  private client: DiscordJS.Client;
  private tracker: Tracker;

  constructor( commands: Command[], client: DiscordJS.Client, tracker: Tracker ) {
    this.commands = commands;
    this.client = client;
    this.tracker = tracker;

    this.client.on('messageCreate', (message) => {
      if (message.author.bot)
        return;
      if (message.content.startsWith(botConfig.prefix)) {
        const [commandName, ...args] = message.content.slice(1).split(" ");
        const command = this.getCommand(commandName);
        if (command) {
          if (command.isEnabled()) {
            if (command.isOwnerOnly() && message.author.id !== "515559976102526986") {
              message.channel.send("This command is owner only.");
              return;
            }
            command.run(message, args, { commands: this.getCommands(), tracker: this.tracker, client: this.client });
          } else {
            message.channel.send("This command is disabled.");
          }
        } else {
          message.channel.send(`Command not found. For a list of commands, use ${botConfig.prefix}help.`);
        }
      }
    });
  }

  public getCommand(commandName: string): Command | undefined {
    return this.commands.find((command) => command.getName() === commandName || command.getAliases().includes(commandName));
  }

  public getCommands(): Command[] {
    return this.commands;
  }
}