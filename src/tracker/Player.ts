export default class Player {
  public data: any;
  public nick: string;
  public uuid: string = '';

  constructor(nick: string, uuid: string) {
    this.nick = nick;
    this.uuid = uuid; 
    this.data = {player: undefined, status: undefined};
  }

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }

  public getNick(): string {
    return this.nick;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public setUuid(uuid: string) {
    this.uuid = uuid;
  }

}