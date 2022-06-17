import Command from "../Command";
import DiscordJS from 'discord.js';
import botConfig from '../botConfig.json';

export default class Help extends Command {

  constructor() {
    super("help", "Displays all commands", `${botConfig.prefix}help`, ["help"], "general", true, false);
  }

  public override async run(message: DiscordJS.Message, _args: string[], additionalData: any): Promise<void> {
    const commands = additionalData.commands;
    const categories = commands.reduce((acc: any, command: any) => {
      if (!acc.includes(command.getCategory())) {
        acc.push(command.getCategory());
      }
      return acc;
    }
    , [] as string[]);
    
    const embed = new DiscordJS.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Commands")
      .setDescription("Here are all the commands you can use in this bot.");
    categories.forEach((category: string) => {
      const commandsInCategory = commands.filter((command: any) => command.getCategory() === category);
      // const commandsInCategoryNames = commandsInCategory.map((command: Command) => command.getName());
      let commandsList = "";
      commandsInCategory.forEach((cmd: Command) => {
        commandsList += cmd.getName() + " - " + cmd.getDescription()+ " ( " + cmd.getUsage() + " )" + "\n";
      })
      embed.addField(category, commandsList);

    });
    message.channel.send({ embeds: [embed] });
  }
}
