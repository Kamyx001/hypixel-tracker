export function blocks_placed(data: any, playerData: any, msg: string) {
  if (data.player.player.stats.Bedwars.practice.bridging.blocks_placed != playerData.player.stats.Bedwars.practice.bridging.blocks_placed) {
    let msg1 = `>>> \`${playerData.player.displayname}\` ${data.player.player.stats.Bedwars.practice.bridging.blocks_placed} > ${playerData.player.stats.Bedwars.practice.bridging.blocks_placed}`;
    data.player.player.stats.Bedwars.practice.bridging.blocks_placed = playerData.player.stats.Bedwars.practice.bridging.blocks_placed;
    msg += '\n' + msg1;
  }
  return msg;
}
