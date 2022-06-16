export function foursLoss(data: any, playerData: any, msg: string) {
  if (data.player.player.stats.Bedwars.four_four_losses_bedwars != playerData.player.stats.Bedwars.four_four_losses_bedwars) {
    //TODO: add winstreak to msg
    let msg1 = `>>> <:loss:928757488025735238>\`${playerData.player.displayname}\` lost a \`4v4v4v4\` game!`;
    data.player.player.stats.Bedwars.four_four_losses_bedwars = playerData.player.stats.Bedwars.four_four_losses_bedwars;
    msg += '\n' + msg1;
  }
  return msg;
}