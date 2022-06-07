import Webhook from "./Webhook";
import webhooks from './webhooks.json';

export default class WebhooksManager {
  private webhooksList: Webhook[] = webhooks
    .map( ( url: string)  => new Webhook(url))
  constructor() {}

  public addWebhook(url: string): void {
    const webhook = new Webhook(url);
    this.webhooksList.push(webhook);
  }

  public getWebhooks(): Webhook[] {
    return this.webhooksList;
  }

  public sendMessageToAll(msg: string): void {
    this.webhooksList.forEach((webhook) => {
      webhook.send(msg);
    });
  }
}
