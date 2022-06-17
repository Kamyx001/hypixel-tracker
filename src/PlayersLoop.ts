import { checkPlayer } from "./checkPlayer";
import { PlayerDataFetchError } from "./errors/PlayerDataFetchError";
//@ts-ignore
import { StatusDataFetchError } from "./errors/StatusDataFetchError";
import PlayerList from "./PlayerList";
import WebhooksManager from "./WebhooksManager";

export default class PlayersLoop {
  addApiKey(apiKey: string) {
    this.apiKeys.push(apiKey);
  }
  private apiKeys: string[];
  private webhooksManager: WebhooksManager;
  private playerList: PlayerList;

  public apiKeyNr = 0;
  public playerNr = 0;

  constructor( playerList: PlayerList, apiKeys: string[], webhooks: WebhooksManager ) {
    this.webhooksManager = webhooks;
    this.apiKeys = apiKeys;
    this.playerList = playerList;
  }

  public initialize() {
    this.loop();
  }

  public stop() {
  }

  //@ts-ignore
  private fetchPlayerData( uuid: string, apiKey: string ): Promise<any> {
    try {
      let response = fetch( `https://api.hypixel.net/player?uuid=${uuid}&key=${apiKey}` ).then( response => response.json() );
      return response;
    } catch (err) {
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
    let time = 1100 / this.apiKeys.length;

    let playerData = this.fetchPlayerData( this.playerList.getPlayers()[this.playerNr].uuid, this.apiKeys[this.apiKeyNr] );
    let statusData = this.fetchStatusData( this.playerList.getPlayers()[this.playerNr].uuid, this.apiKeys[this.apiKeyNr] );
    
    await playerData;
    await statusData;

    let msg = "";

    if ( this.playerList.getPlayers()[this.playerNr].data.player == undefined || this.playerList.getPlayers()[this.playerNr].data.status == undefined ) {
      this.playerList.getPlayers()[this.playerNr].data.player = await playerData;
      this.playerList.getPlayers()[this.playerNr].data.status = await statusData;
    } else {
      msg = checkPlayer( this.playerList.getPlayers()[this.playerNr]?.data, await playerData, await statusData );
    }
    
    if (msg != "") {
      this.webhooksManager.sendMessageToAll(msg);
    }

    if ( this.apiKeyNr < this.apiKeys.length - 1 ) {
      this.apiKeyNr++;
    } else {
      this.apiKeyNr = 0;
    }
    if ( this.playerNr < this.playerList.getPlayers().length - 1 ) {
      this.playerNr++;
    } else {
      this.playerNr = 0;
    }
    console.log(time);
    
    setTimeout(() => {
      this.loop();
    }, time);
  }
}
