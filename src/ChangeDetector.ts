import { PlayerDataFetchError } from "./errors/PlayerDataFetchError";
//@ts-ignore
import { StatusDataFetchError } from "./errors/StatusDataFetchError";
import Player from "./Player";
import PlayerList from "./PlayerList";
import WebhooksManager from "./WebhooksManager";

export default class ChangeDetector {
  private apiKeys: string[];
  private players: Player[];
  private webhooksManager: WebhooksManager;

  public data = []

  constructor( playerList: PlayerList, apiKeys: string[], webhooks: WebhooksManager ) {
    this.players = playerList.getPlayers();
    this.webhooksManager = webhooks;
    this.apiKeys = apiKeys;
  }

  public initialize() {
    this.loop();
  }

  public stop() {
  }

  //@ts-ignore
  private fetchPlayerData( uuid: string, apiKey: string ): Promise<any>|null {
    try {
      let response = fetch( `https://api.hypixel.net/player?uuid=${uuid}&key=${apiKey}` ).then( response => response.json() );
      return response;
    } catch (error) {
      console.log(error);
      throw new PlayerDataFetchError(uuid);
    }
  }

  //@ts-ignore
  private fetchStatusData( uuid: string, apiKey: string ): Promise<any> {
    try {
      let response = fetch( `https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}` ).then( response => response.json() );
      return response;
    } catch (err) {
      throw new StatusDataFetchError(uuid);
    }
  }

  private async loop() {
    this.fetchStatusData( this.players[0].uuid, this.apiKeys[0] ).then( response => {
      console.log(response.success);
      this.webhooksManager.sendMessageToAll(JSON.stringify(response));
    })
    setTimeout(() => {
      this.loop();
    }, 1000);
  }
}