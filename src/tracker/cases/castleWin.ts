export default function castleWin( data: any, playerData: any, msg: string ) {
  if (data.player.player.stats.Bedwars.castle_wins_bedwars != playerData.player.stats.Bedwars.castle_wins_bedwars) {
    let msg1 = `> <:win:965948193328201730>\`${playerData.player.displayname}\` won a \`castle\` game with \`${playerData.player.stats.Bedwars.castle_final_kills_bedwars - data.player.player.stats.Bedwars.castle_final_kills_bedwars} final kills\` and \`${ playerData.player.stats.Bedwars.castle_beds_broken_bedwars - data.player.player.stats.Bedwars.castle_beds_broken_bedwars } beds broken\``;
    data.player.player.stats.Bedwars.castle_wins_bedwars = playerData.player.stats.Bedwars.castle_wins_bedwars;
    msg += '\n' + msg1;
  }
  
  return msg;
}