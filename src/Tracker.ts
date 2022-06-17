import WebhooksManager from './WebhooksManager';
import fs from 'fs/promises';
import PlayersLoop from './PlayersLoop';
import PlayerList from './PlayerList';

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

  public async addApiKey(apiKey: string) {
    this.changeDetector.addApiKey(apiKey);
    await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
  }

  public async addPlayer(player: string) {
    await this.playerList.addPlayer(player);
    let players: playerJSON[] = []
    this.playerList.getPlayers().forEach((player) => { players.push({nick: player.getNick(), uuid: player.getUuid()}) });
    await fs.writeFile('./js/players.json', JSON.stringify(players));
    await fs.writeFile('./src/players.json', JSON.stringify(players));
  }

  public async addWebhook(webhook: string) {
    this.webhooksManager.addWebhook(webhook);
    await fs.writeFile('./js/webhooks.json', JSON.stringify(this.webhooksManager.getWebhooks()));
  }

  public sendMessageToAllWebhooks(message: string): void {
    this.webhooksManager.sendMessageToAll(message);
  }

  public initialize(): void {
    
  }
}