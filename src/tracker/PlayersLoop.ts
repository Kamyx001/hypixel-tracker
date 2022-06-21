import { checkPlayer } from "./checkPlayer";
import { PlayerDataFetchError } from "../errors/PlayerDataFetchError";
//@ts-ignore
import { StatusDataFetchError } from "../errors/StatusDataFetchError";
import PlayerList from "./PlayerList";
import WebhooksManager from "./WebhooksManager";
import winstreaks from "../winstreaks.json";
import fs from 'fs/promises';

export interface WinstreaksObject {
  uuid: string;
  overall: number;
  solo: number;
  doubles: number;
  threes: number;
  fours: number;
  soloEstimate?: boolean;
  doublesEstimate?: boolean;
  threesEstimate?: boolean;
  foursEstimate?: boolean;
}

export default class PlayersLoop {
  addApiKey(apiKey: string) {
    this.apiKeys.push(apiKey);
  }
  private apiKeys: string[];
  private webhooksManager: WebhooksManager;
  private playerList: PlayerList;
  private winstreaks: WinstreaksObject[] = winstreaks;

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
    
    setTimeout(() => {
      this.loop();
    }, time);

    let msg = "";
    let obj = undefined;

    if ( !this.winstreaks.find( obj => obj.uuid == this.playerList.getPlayers()[this.playerNr].uuid ) ) {
      this.winstreaks.push( { uuid: this.playerList.getPlayers()[this.playerNr].uuid, overall: 0, solo: 0, doubles: 0, threes: 0, fours: 0, soloEstimate: true, doublesEstimate: true, threesEstimate: true, foursEstimate: true } );
    }

    if ( this.playerList.getPlayers()[this.playerNr].data.player == undefined || this.playerList.getPlayers()[this.playerNr].data.status == undefined ) {
      this.playerList.getPlayers()[this.playerNr].data.player = await playerData;
      this.playerList.getPlayers()[this.playerNr].data.status = await statusData;
    } else {
      obj = checkPlayer( this.playerList.getPlayers()[this.playerNr]?.data, await playerData, await statusData, this.winstreaks.find( obj => obj.uuid == this.playerList.getPlayers()[this.playerNr].uuid )! );
      msg = obj.msg;
      let ws = this.winstreaks.find( obj => obj.uuid == this.playerList.getPlayers()[this.playerNr].uuid )
      ws!.overall = obj.winstreaks.overall;
      ws!.solo = obj.winstreaks.solo;
      ws!.doubles = obj.winstreaks.doubles;
      ws!.threes = obj.winstreaks.threes;
      ws!.fours = obj.winstreaks.fours;
      ws!.soloEstimate = obj.winstreaks.soloEstimate;
      ws!.doublesEstimate = obj.winstreaks.doublesEstimate;
      ws!.threesEstimate = obj.winstreaks.threesEstimate;
      ws!.foursEstimate = obj.winstreaks.foursEstimate;
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
    await fs.writeFile( './src/winstreaks.json', JSON.stringify( this.winstreaks ) );
    await fs.writeFile( './js/winstreaks.json', JSON.stringify( this.winstreaks ) );
    
    console.log(time * this.playerList.getPlayers().length);

  }
}
