export function soloWin(data: any, playerData: any, msg: string) {
  if (data.player.player.stats.Bedwars.eight_one_wins_bedwars != playerData.player.stats.Bedwars.eight_one_wins_bedwars) {
    //TODO: add winstreak to msg
    let msg1 = `>>> <:win:965948193328201730>\`${playerData.player.displayname}\` won a \`solo\` game!`;
    data.player.player.stats.Bedwars.eight_one_wins_bedwars = playerData.player.stats.Bedwars.eight_one_wins_bedwars;
    msg += '\n' + msg1;
  }

  if (Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 - Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100 <= -0.01) {
    let msg1 = `<:green_triangle:966364916548255874>\`${playerData.player.displayname}\` [Overall] \`${Math.floor((data.player.player.stats.Bedwars.final_kills_bedwars / data.player.player.stats.Bedwars.final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.final_kills_bedwars / playerData.player.stats.Bedwars.final_deaths_bedwars)*100)/100}\` [Solo] \`${Math.floor((data.player.player.stats.Bedwars.eight_one_final_kills_bedwars / data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100} → ${Math.floor((playerData.player.stats.Bedwars.eight_one_final_kills_bedwars / playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars)*100)/100}\``;
    data.player.player.stats.Bedwars.eight_one_final_kills_bedwars = playerData.player.stats.Bedwars.eight_one_final_kills_bedwars;
    data.player.player.stats.Bedwars.eight_one_final_deaths_bedwars = playerData.player.stats.Bedwars.eight_one_final_deaths_bedwars;
    data.player.player.stats.Bedwars.final_kills_bedwars = playerData.player.stats.Bedwars.final_kills_bedwars;
    data.player.player.stats.Bedwars.final_deaths_bedwars = playerData.player.stats.Bedwars.final_deaths_bedwars;
    msg += '\n' + msg1;
  }
  
  return msg;
}
