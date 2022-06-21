import { castleLoss, castleWin, doublesLoss, doublesWin, foursLoss, foursWin, gameStarted, onlineOffline, soloLoss, soloWin, threesLoss, threesWin,  } from './cases/index';
import { WinstreaksObject } from "./PlayersLoop";

export function checkPlayer(data: any, playerData: any, statusData: any, winstreaks: WinstreaksObject) {
  let msg = "";

  msg = onlineOffline(data, statusData, playerData, msg);
  
  msg = gameStarted(data, playerData, msg);
  
  let obj = soloWin(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  obj = soloLoss(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;
  
  obj = doublesWin(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  obj = doublesLoss(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;
  
  obj = threesWin(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  obj = threesLoss(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  obj = foursWin(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  obj = foursLoss(data, playerData, msg, winstreaks);
  msg = obj.msg;
  winstreaks = obj.winstreaks;

  msg = castleWin(data, playerData, msg);

  msg = castleLoss(data, playerData, msg);

  return { msg, winstreaks};
}
