import Player from "./Player";
import { playerJSON } from "./Tracker";
import DiscordJS from 'discord.js';

export default class PlayerList {
  private players: Player[] = [];

  constructor( players: playerJSON[] ) {
    players.forEach((player) => {
      this.players.push(new Player(player.nick, player.uuid));
    });
  }

  public async addPlayer(nick: string, message: DiscordJS.Message) {
    const uuid = await this.nickToUuid(nick);
    if (uuid === "") {
      message.channel.send(`${nick} is not a valid player.`);
      return;
    }
    this.players.push(new Player(nick, uuid));
  }

  public getPlayers() {
    return this.players;
  }

  private async nickToUuid(nick: string): Promise<string> {
    try {
      const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
      const res_1 = await res.json();
      return res_1.id;
    } catch (error) {
      return "";
    }
  }
}