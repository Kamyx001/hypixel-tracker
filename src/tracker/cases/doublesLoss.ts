import { WinstreaksObject } from "../PlayersLoop";

export default function doublesLoss(data: any, playerData: any, msg: string, winstreaks: WinstreaksObject) {
  if (data.player.player.stats.Bedwars.eight_two_losses_bedwars != playerData.player.stats.Bedwars.eight_two_losses_bedwars) {
    //TODO: add winstreak to msg
    let msg1 = `> <:loss:928757488025735238>\`${playerData.player.displayname}\` lost a \`doubles\` game!`;
    let wsmsg = `> :small_blue_diamond:WS - [${ winstreaks.doublesEstimate ? "Estimate" : "Acurate" }] • [Doubles] \`${ winstreaks.doubles } → 0\` [Overall] \`${ winstreaks.overall } → 0\``
    data.player.player.stats.Bedwars.eight_two_losses_bedwars = playerData.player.stats.Bedwars.eight_two_losses_bedwars;
    winstreaks.doubles = 0;
    winstreaks.overall = 0;
    winstreaks.doublesEstimate = false;
    msg += '\n' + msg1;
    msg += '\n' + wsmsg;
  }

  if (Math.floor((data.player.player.stats.Bedwars.eight_two_final_kills_bedwars / data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10 - Math.floor((playerData.player.stats.Bedwars.eight_two_final_kills_bedwars / playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10 >= 0.01) {
    let msg1 = `> <:green_triangle:966364916548255874>FKDR - [Overall] \`${Math.floor((data.player.player.stats.Bedwars.final_kills_bedwars / data.player.player.stats.Bedwars.final_deaths_bedwars)*10)/10} → ${Math.floor((playerData.player.stats.Bedwars.final_kills_bedwars / playerData.player.stats.Bedwars.final_deaths_bedwars)*10)/10}\` [Doubles] \`${Math.floor((data.player.player.stats.Bedwars.eight_two_final_kills_bedwars / data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10} → ${Math.floor((playerData.player.stats.Bedwars.eight_two_final_kills_bedwars / playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars)*10)/10}\``;
    data.player.player.stats.Bedwars.eight_two_final_kills_bedwars = playerData.player.stats.Bedwars.eight_two_final_kills_bedwars;
    data.player.player.stats.Bedwars.eight_two_final_deaths_bedwars = playerData.player.stats.Bedwars.eight_two_final_deaths_bedwars;
    data.player.player.stats.Bedwars.final_kills_bedwars = playerData.player.stats.Bedwars.final_kills_bedwars;
    data.player.player.stats.Bedwars.final_deaths_bedwars = playerData.player.stats.Bedwars.final_deaths_bedwars;
    msg += '\n' + msg1;
  }

  return {msg, winstreaks};
}
