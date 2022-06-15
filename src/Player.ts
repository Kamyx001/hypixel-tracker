export default class Player {
  public data: any;
  public nick: string;
  public uuid: string = '';

  constructor(nick: string, uuid: string) {
    this.nick = nick;
    this.uuid = uuid; 
    this.data = {player: undefined};
  }
}