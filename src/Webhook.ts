import { WebhookClient } from 'discord.js';
import WebhookNotWorking from './errors/WebhookNotWorking';

export default class Webhook {
  private id: string;
  private token: string;
  private url: string;
  private webhook: WebhookClient | undefined = undefined;
  constructor( url: string ) {
    this.url = url;
    [this.id, this.token] = this.url.replace('https://discord.com/api/webhooks/', '').split('/');
    
    fetch( this.url ).then((data) => data.json()).then((data) => { if (!data.id) { 
        console.error(new WebhookNotWorking(this.url)); 
        return;
      } 
      this.webhook = new WebhookClient({ id: this.id, token: this.token });
    });
  }

  public send( msg: string ) {
    if (this.webhook === undefined) {
      return;
    } 
    try {
      this.webhook.send({ content: msg });
    } catch (error) {
      console.log(error);
    }
  }

  public getUrl() {
    return this.url;
  }

}