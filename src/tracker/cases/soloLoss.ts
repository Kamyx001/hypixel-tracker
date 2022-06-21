import { WinstreaksObject } from "../PlayersLoop";

export default function soloLose(data: any, playerData: any, msg: string, winstreaks: WinstreaksObject) {
  if (data.player.player.stats.Bedwars.eight_one_losses_bedwars != playerData.player.stats.Bedwars.eight_one_losses_bedwars) {
    console.log(winstreaks.soloEstimate);
    let msg1 = `> <:loss:928757488025735238>\`${playerData.player.displayname}\` lost a \`solo\` game!`;
    let wsmsg = `> :small_blue_diamond:WS - [Acurate] • [Solo] \`${ winstreaks.solo } → 0\` [Overall] \`${ winstreaks.overall } → 0\``
    data.player.player.stats.Bedwars.eight_one_losses_bedwars = playerData.player.stats.Bedwars.eight_one_losses_bedwars;
    winstreaks.solo = 0;
    winstreaks.overall = 0;
    winstreaks.soloEstimate = false;
    msg += '\n' + msg1;
    msg += '\n' + wsmsg;
  }

  if (Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 - Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 >= 0.01) {
    let msg1 = `> <:green_triangle:966364916548255874>FKDR - [Overall] \`${Math.floor((data.player.player.stats.Bedwars.final_kills_bedwars / data.player.player.stats.Bedwars.final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.final_kills_bedwars / playerData.player.stats.Bedwars.final_deaths_bedwars)*100)/100}\` [Solo] \`${Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100}\``;
    data.player.player.stats.Bedwars.eight_one_final_kills_bedwars = playerData.player.stats.Bedwars.eight_one_final_kills_bedwars;
    data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars = playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars;
    data.player.player.stats.Bedwars.final_kills_bedwars = playerData.player.stats.Bedwars.final_kills_bedwars;
    data.player.player.stats.Bedwars.final_deaths_bedwars = playerData.player.stats.Bedwars.final_deaths_bedwars;
    msg += '\n' + msg1;
  }
  return {msg, winstreaks};
}
