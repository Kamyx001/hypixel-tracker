import { checkPlayer } from "./checkPlayer";
import { PlayerDataFetchError } from "./errors/PlayerDataFetchError";
//@ts-ignore
import { StatusDataFetchError } from "./errors/StatusDataFetchError";
import Player from "./Player";
import PlayerList from "./PlayerList";
import WebhooksManager from "./WebhooksManager";

export default class PlayersLoop {
  private apiKeys: string[];
  private players: Player[];
  private webhooksManager: WebhooksManager;

  public apiKeyNr = 0;
  public playerNr = 0;

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
  private fetchPlayerData( uuid: string, apiKey: string ): Promise<any> {
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
    let time = 1000 / this.apiKeys.length;

    let playerData = this.fetchPlayerData( this.players[this.playerNr].uuid, this.apiKeys[this.apiKeyNr] );
    
    // let statusData = this.fetchStatusData( this.players[this.playerNr].uuid, this.apiKeys[this.apiKeyNr] );
    
    await playerData;

    let msg = "";

    if ( this.players[this.playerNr].data.player == undefined ) {
      this.players[this.playerNr].data.player = await playerData;
    } else {
      msg = checkPlayer( this.players[this.playerNr]?.data, await playerData);
    }

    console.log(playerData);
    
    if (msg != "") {
      this.webhooksManager.sendMessageToAll(msg);
    }

    if ( this.apiKeyNr < this.apiKeys.length - 1 ) {
      this.apiKeyNr++;
    } else {
      this.apiKeyNr = 0;
    }
    if ( this.playerNr < this.players.length - 1 ) {
      this.playerNr++;
    } else {
      this.playerNr = 0;
    }
    
    setTimeout(() => {
      this.loop();
    }, time);
  }
}
