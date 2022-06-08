
import WebhooksManager from './WebhooksManager';
import fs from 'fs/promises';


interface playerJSON {
  nick: string;
  uuid: string;
}
export default class Tracker {

  players: playerJSON[];
  apiKeys: string[];
  webhooks: string[];
  
  constructor(playerJSON: playerJSON[] , apiKeys: string[], webhooks: string[]) {
    this.players = playerJSON;
    this.apiKeys = apiKeys;
    this.webhooks = webhooks;
    const manager = new WebhooksManager()
    manager.sendMessageToAll("Hello World!");
  }

  public async addApiKey(apiKey: string) {
    this.apiKeys.push(apiKey);
    await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
  }

  public getApiKeys(): string[] {
    return this.apiKeys;
  }

  public initialize(): void {
    // TODO: Make this function do something
  }
}