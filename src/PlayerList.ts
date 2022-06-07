import Player from "./Player";


export default class PlayerList {
    players: Player[] = [];
    constructor() {}

    public async addPlayer(nick: string) {
        this.players.push(new Player(nick, await this.nickToUuid(nick)));
    }

    private async nickToUuid(nick: string): Promise<string> {
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
        const res_1 = await res.json();
        return res_1.id;
    }
}