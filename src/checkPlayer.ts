import { blocks_placed } from "./cases/blocks_placed";
import { gameStarted } from "./cases/gameStarted";
import { soloLose as soloLoss } from "./cases/soloLoss";
import { soloWin } from "./cases/soloWin";
import { doublesWin } from "./cases/doublesWin";
import { doublesLoss } from "./cases/doublesLoss";
import { threesLoss } from "./cases/threesLoss";
import { threesWin } from "./cases/threesWin";
import { foursWin } from "./cases/foursWin";
import { foursLoss } from "./cases/foursLoss";
import { onlineOffline } from "./cases/onlineOffline";

export function checkPlayer(data: any, playerData: any, statusData: any): string {
  let msg = "";

  msg = onlineOffline(data, statusData, playerData, msg);

  msg = blocks_placed(data, playerData, msg);

  msg = gameStarted(data, playerData, msg);

  msg = soloWin(data, playerData, msg);

  msg = soloLoss(data, playerData, msg);
  
  msg = doublesWin(data, playerData, msg);

  msg = doublesLoss(data, playerData, msg);

  msg = threesWin(data, playerData, msg);

  msg = threesLoss(data, playerData, msg);

  msg = foursWin(data, playerData, msg);

  msg = foursLoss(data, playerData, msg);

  return msg;
}
