import Command from '../Command';
import { Message } from 'discord.js';

export default class AddPlayer extends Command {

  constructor() {
    super("addplayer", "Adds a player to the tracker", ["player"], ["addplayer", "add"], "tracker", true, false);
  }

  public override async run(message: Message, args: string[], additionalData: any): Promise<void> {
    if ( additionalData.tracker.getPlayers().find((player: any) => player.getNick().toLowerCase() === args[0].toLocaleLowerCase()) ) {
      message.channel.send(`${args[0]} is already in the tracker.`);
      return;
    }
    if (args.length < 1) {
      message.channel.send("Please provide a player name.");
      return;
    }
    const playerName = args[0];
    await additionalData.tracker.addPlayer(playerName, message);
    if ( additionalData.tracker.getPlayers().find((player: any) => player.getNick().toLowerCase() === args[0].toLocaleLowerCase()) ) {
      additionalData.client.user!.setActivity({ name: `${additionalData.tracker.getPlayers().length} players`, type: 'WATCHING', shardId: 0 });
      message.channel.send(`Added player ${playerName} to the tracker.`);
    }
  }
}