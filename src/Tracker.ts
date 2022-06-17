import WebhooksManager from './WebhooksManager';
import fs from 'fs/promises';
import PlayersLoop from './PlayersLoop';
import PlayerList from './PlayerList';
import DiscordJS from 'discord.js';

export interface playerJSON {
  nick: string;
  uuid: string;
}
export default class Tracker {
  private apiKeys: string[];
  private playerList: PlayerList;
  private webhooksManager: WebhooksManager;
  private changeDetector: PlayersLoop;

  constructor(playerJSON: playerJSON[] , apiKeys: string[], webhooks: string[]) {
    this.playerList = new PlayerList( playerJSON );
    this.apiKeys = apiKeys;
    this.webhooksManager = new WebhooksManager( webhooks );
    this.changeDetector = new PlayersLoop( this.playerList, this.apiKeys, this.webhooksManager );
    this.changeDetector.initialize();
  }

  public getPlayers(): playerJSON[] {
    return this.playerList.getPlayers();
  }

  public getApiKeys(): string[] {
    return this.apiKeys;
  }

  public fetchUsage(apiKey: any) {
    return fetch(`https://api.hypixel.net/key?key=${apiKey}`).then(response => response.json());
  }

  public async addApiKey(apiKey: string) {
    this.changeDetector.addApiKey(apiKey);
    await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
    await fs.writeFile('./src/apiKeys.json', JSON.stringify(this.apiKeys));
  }

  public async addPlayer(player: string, message: DiscordJS.Message) {
    await this.playerList.addPlayer(player, message);
    let players: playerJSON[] = []
    this.playerList.getPlayers().forEach((player) => { players.push({nick: player.getNick(), uuid: player.getUuid()}) });
    await fs.writeFile('./js/players.json', JSON.stringify(players));
    await fs.writeFile('./src/players.json', JSON.stringify(players));
  }

  public async addWebhook(webhook: string, message: DiscordJS.Message) {
    this.webhooksManager.addWebhook(webhook, message);
  }

  public async removeWebhook(webhook: string, message: DiscordJS.Message) {
    this.webhooksManager.removeWebhook(webhook, message);
  }

  public sendMessageToAllWebhooks(message: string): void {
    this.webhooksManager.sendMessageToAll(message);
  }

  public initialize(): void {
    
  }
}