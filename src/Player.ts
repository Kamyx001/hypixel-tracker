


export default class Player {
  public nick: string;
  public uuid: string = '';

  constructor(nick: string, uuid: string) {
    this.nick = nick;
  }
}