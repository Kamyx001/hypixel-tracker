export function checkPlayer(data: any, playerData: any): string {
  let bedwarsStatsData = data.player.player.stats.Bedwars;
  let bedwarsStatsPlayerData = playerData.player.stats.Bedwars;

  let msg = "";

  if( bedwarsStatsData.practice.bridging.blocks_placed != bedwarsStatsPlayerData.practice.bridging.blocks_placed ) {
    let msg1 = `>>> \`${playerData.player.displayname}\` ${bedwarsStatsData.practice.bridging.blocks_placed} > ${bedwarsStatsPlayerData.practice.bridging.blocks_placed}`
    bedwarsStatsData.practice.bridging.blocks_placed = bedwarsStatsPlayerData.practice.bridging.blocks_placed;
    msg += msg1;
  }

  if ( bedwarsStatsData.games_played_bedwars_1 != bedwarsStatsPlayerData.games_played_bedwars_1 ) {
    let msg1 = `>>> \`${playerData.player.displayname}'s\` game has started`
    bedwarsStatsData.games_played_bedwars_1 = bedwarsStatsPlayerData.games_played_bedwars_1;
    msg += '\n' + msg1;
  }

  return msg;
}
