
import WebhooksManager from './WebhooksManager';
import fs from 'fs/promises';

export default class Tracker {
  apiKeys: string[];
  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys;
    const manager = new WebhooksManager()
    manager.sendMessageToAll("Hello World!");
  }

  // TODO fix this function
  public async addApiKey(apiKey: string) {
    this.apiKeys.push(apiKey);
    await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
  }

  public getApiKeys(): string[] {
    return this.apiKeys;
  }

  public initialize(): void {
    
  }
}