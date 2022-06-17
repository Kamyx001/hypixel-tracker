import Command from "../Command";
import DiscordJS from 'discord.js';

export default class Players extends Command {
  constructor() {
    super("players", "Lists all players in the tracker.", "players", ["players"], "tracker", true, false);
  }

  public override run(message: DiscordJS.Message, args: string[], additionalData: any): void {
    const players = additionalData.tracker.getPlayers();
    const playerNames = players.map((player: any) => player.getNick());
    message.channel.send(`\`\`\`(${playerNames.length} players)\n- ${playerNames.join("\n- ")}\`\`\``);
  }
}