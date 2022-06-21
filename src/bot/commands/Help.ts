import Command from "../Command";
import {Message, MessageEmbed} from 'discord.js';
import botConfig from '../botConfig.json';

export default class Help extends Command {

  constructor() {
    super("help", "Displays all commands", [], ["help"], "general", true, false);
  }

  public override async run(message: Message, _args: string[], additionalData: any): Promise<void> {
    const commands = additionalData.commands;
    const categories = commands.reduce((acc: any, command: any) => {
      if (!acc.includes(command.getCategory())) {
        acc.push(command.getCategory());
      }
      return acc;
    }
    , [] as string[]);
    
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Commands")
      .setDescription("Here are all the commands you can use in this bot.");
    categories.forEach((category: string) => {
      const commandsInCategory = commands.filter((command: any) => command.getCategory() === category);
      let commandsList = "";
      commandsInCategory.forEach((cmd: Command) => {
        commandsList += `- **${ cmd.getName() }** - ${ cmd.getDescription() } ( ${ botConfig.prefix + cmd.getAliases().join("/") + ((cmd.getArgs().length==0)?"":" <") + cmd.getArgs().join("> <") + ((cmd.getArgs().length==0)?"":">") } )\n`;
      })
      embed.addField(`***${category}***`, commandsList);

    });
    message.channel.send({ embeds: [embed] });
  }
}
