import fs from 'fs/promises';
import ChangeDetector from './ChangeDetector';
import PlayerList from './PlayerList';

export default class Tracker {
  apiKeys: string[];
	players: PlayerList;
  constructor(apiKeys: string[], players: PlayerList) {
		this.apiKeys = apiKeys;
		this.players = players;
	}

	public async addApiKey(apiKey: string) {
		this.apiKeys.push(apiKey);
		await fs.writeFile('./js/apiKeys.json', JSON.stringify(this.apiKeys));
	}

  public getApiKeys(): string[] {
    return this.apiKeys;
  }

  public initialize(): void {
		new ChangeDetector();
  }
}