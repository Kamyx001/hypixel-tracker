export default function gameStarted(data: any, playerData: any, msg: string) {
  if (data.player.player.stats.Bedwars.games_played_bedwars_1 != playerData.player.stats.Bedwars.games_played_bedwars_1) {
    let msg1 = `> \`${playerData.player.displayname}'s\` game has started`;
    data.player.player.stats.Bedwars.games_played_bedwars_1 = playerData.player.stats.Bedwars.games_played_bedwars_1;
    msg += '\n' + msg1;
  }
  return msg;
}
