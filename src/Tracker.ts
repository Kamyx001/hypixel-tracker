import WebhooksManager from './WebhooksManager';
import fs from 'fs/promises';
import ChangeDetector from './ChangeDetector';
import PlayerList from './PlayerList';

export interface playerJSON {
  nick: string;
  uuid: string;
}
export default class Tracker {
  public apiKeys: string[];
  public playerList: PlayerList;
  public webhooksManager: WebhooksManager;

  constructor(playerJSON: playerJSON[] , apiKeys: string[], webhooks: string[]) {
    this.playerList = new PlayerList( playerJSON );
    this.apiKeys = apiKeys;
    this.webhooksManager = new WebhooksManager( webhooks );
  }

  public async addApiKey(apiKey: string) {
    this.apiKeys.push(apiKey);
    await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
  }

  public initialize(): void {
    const changeDetector = new ChangeDetector( this.playerList, this.apiKeys, this.webhooksManager );
    changeDetector.initialize();
  }
}