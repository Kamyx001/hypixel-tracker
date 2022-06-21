export default function onlineOffline(data: any, statusData: any, playerData: any, msg: string) {
  if (data.status.session.online != statusData.session.online) {
    let msg1 = `> ${statusData.session.online ? "<:online:966385353659396157>" : "<:offline:966384878272778320>"}\`${playerData.player.displayname}\` is ${statusData.session.online ? "online" : "offline"}`;

    data.status.session.online = statusData.session.online;
    
    msg += '\n' + msg1;
  }
  return msg;
}
