import Player from "./Player";
import { playerJSON } from "./Tracker";

export default class PlayerList {
  private players: Player[] = [];

  constructor( players: playerJSON[] ) {
    players.forEach((player) => {
      this.players.push(new Player(player.nick, player.uuid));
    });
  }

  public async addPlayer(nick: string) {
    this.players.push(new Player(nick, await this.nickToUuid(nick)));
  }

  public getPlayers() {
    return this.players;
  }

  private async nickToUuid(nick: string): Promise<string> {
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
    const res_1 = await res.json();
    return res_1.id;
  }
}