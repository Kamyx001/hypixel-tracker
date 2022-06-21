import { WinstreaksObject } from "../PlayersLoop";

export default function doublesWin(data: any, playerData: any, msg: string, winstreaks: WinstreaksObject) {
  if (data.player.player.stats.Bedwars.eight_two_wins_bedwars != playerData.player.stats.Bedwars.eight_two_wins_bedwars) {
    //TODO: add winstreak to msg
    let msg1 = `> <:win:965948193328201730>\`${playerData.player.displayname}\` won a \`doubles\` game!`;
    let wsmsg = `> :small_blue_diamond:WS - [${ winstreaks.doublesEstimate ? "Estimate" : "Acurate" }] • [Doubles] \`${ winstreaks.doubles } → ${ winstreaks.doubles + 1 }\` [Overall] \`${ winstreaks.overall } → ${ winstreaks.overall + 1 }\``
    data.player.player.stats.Bedwars.eight_two_wins_bedwars = playerData.player.stats.Bedwars.eight_two_wins_bedwars;
    winstreaks.doubles++;
    winstreaks.overall++;
    msg += '\n' + msg1;
    msg += '\n' + wsmsg;
  }

  if (Math.floor((data.player.player.stats.Bedwars.eight_two_final_kills_bedwars / data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10 - Math.floor((playerData.player.stats.Bedwars.eight_two_final_kills_bedwars / playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10 <= -0.01) {
    let msg1 = `> <:green_triangle:966364916548255874>FKDR - [Overall] \`${Math.floor((data.player.player.stats.Bedwars.final_kills_bedwars / data.player.player.stats.Bedwars.final_deaths_bedwars)*10)/10} → ${Math.floor((playerData.player.stats.Bedwars.final_kills_bedwars / playerData.player.stats.Bedwars.final_deaths_bedwars)*10)/10}\` [Doubles] \`${Math.floor((data.player.player.stats.Bedwars.eight_two_final_kills_bedwars / data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10} → ${Math.floor((playerData.player.stats.Bedwars.eight_two_final_kills_bedwars / playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10}\``;
    data.player.player.stats.Bedwars.eight_two_final_kills_bedwars = playerData.player.stats.Bedwars.eight_two_final_kills_bedwars;
    data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars = playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars;
    data.player.player.stats.Bedwars.final_kills_bedwars = playerData.player.stats.Bedwars.final_kills_bedwars;
    data.player.player.stats.Bedwars.final_deaths_bedwars = playerData.player.stats.Bedwars.final_deaths_bedwars;
    msg += '\n' + msg1;
  }
  
  return {msg, winstreaks};
}
