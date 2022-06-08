import Webhook from "./Webhook";
export default class WebhooksManager {
  private webhooksList: Webhook[] = [];
  constructor( webhooks: string[] ) {
    webhooks.forEach((url) => {
      this.addWebhook(url);
    });
  }

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
