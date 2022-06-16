export function foursWin(data: any, playerData: any, msg: string) {
  if (data.player.player.stats.Bedwars.four_four_wins_bedwars != playerData.player.stats.Bedwars.four_four_wins_bedwars) {
    //TODO: add winstreak to msg
    let msg1 = `>>> <:win:965948193328201730>\`${playerData.player.displayname}\` won a \`4v4v4v4\` game!`;
    data.player.player.stats.Bedwars.four_four_wins_bedwars = playerData.player.stats.Bedwars.four_four_wins_bedwars;
    msg += '\n' + msg1;
  }
  return msg;
}
