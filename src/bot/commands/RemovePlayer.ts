import Command from "../Command";
import { Message } from "discord.js";

export default class RemovePlayer extends Command {
  constructor() {
    super("removeplayer", "Remove a player from the tracker", ["player"], ["removeplayer", "remove", "rm"], "admin only", true, true);
  }

  override async run(message: Message, args: string[], additionalData: any) {
    if (args.length < 1) {
      message.channel.send("Please provide a player name.");
      return;
    }
    const playerName = args[0];
    await additionalData.tracker.removePlayer(playerName, message);
    if ( !additionalData.tracker.getPlayers().find((player: any) => player.getNick().toLowerCase() === args[0].toLocaleLowerCase()) ) {
      additionalData.client.user!.setActivity({ name: `${additionalData.tracker.getPlayers().length} players`, type: 'WATCHING', shardId: 0 });
      message.channel.send(`Removed player ${playerName} from the tracker.`);
    }
  }
}