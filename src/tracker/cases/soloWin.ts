import { WinstreaksObject } from "../PlayersLoop";

export default function soloWin(data: any, playerData: any, msg: string, winstreaks: WinstreaksObject) {
  if (data.player.player.stats.Bedwars.eight_one_wins_bedwars != playerData.player.stats.Bedwars.eight_one_wins_bedwars) {
    console.log(winstreaks.soloEstimate);
    let msg1 = `> <:win:965948193328201730>\`${playerData.player.displayname}\` ${playerData.player.stats.Bedwars.eight_one_beds_lost_bedwars != data.player.player.stats.Bedwars.eight_one_beds_lost_bedwars ? 'clutched' : 'won'} a \`solo\` game with \`${playerData.player.stats.Bedwars.eight_one_final_kills_bedwars - data.player.player.stats.Bedwars.eight_one_final_kills_bedwars} final kills\` and \`${ playerData.player.stats.Bedwars.eight_one_beds_broken_bedwars - data.player.player.stats.Bedwars.eight_one_beds_broken_bedwars } beds broken\``;
    data.player.player.stats.Bedwars.eight_one_wins_bedwars = playerData.player.stats.Bedwars.eight_one_wins_bedwars;
    let wsmsg = `> :small_blue_diamond:WS - [${ winstreaks.soloEstimate ? "Estimate" : "Acurate" }] • [Solo] \`${ winstreaks.solo } → ${ winstreaks.solo + 1 }\` [Overall] \`${ winstreaks.overall } → ${ winstreaks.overall + 1 }\``
    winstreaks.solo++;
    winstreaks.overall++;
    msg += '\n' + msg1;
    msg += '\n' + wsmsg;
  }

  if (Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 - Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 <= -0.01) {
    let msg1 = `> <:green_triangle:966364916548255874>FKDR - [Overall] \`${Math.floor((data.player.player.stats.Bedwars.final_kills_bedwars / data.player.player.stats.Bedwars.final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.final_kills_bedwars / playerData.player.stats.Bedwars.final_deaths_bedwars)*100)/100}\` [Solo] \`${Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100}\``;
    data.player.player.stats.Bedwars.eight_one_final_kills_bedwars = playerData.player.stats.Bedwars.eight_one_final_kills_bedwars;
    data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars = playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars;
    data.player.player.stats.Bedwars.final_kills_bedwars = playerData.player.stats.Bedwars.final_kills_bedwars;
    data.player.player.stats.Bedwars.final_deaths_bedwars = playerData.player.stats.Bedwars.final_deaths_bedwars;
    msg += '\n' + msg1;
  }
  
  return { msg, winstreaks };
}
