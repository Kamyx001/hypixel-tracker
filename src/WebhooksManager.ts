import Webhook from "./Webhook";
import fs from 'fs/promises';
export default class WebhooksManager {
  private webhooks: string[];
  private webhooksList: Webhook[] = [];

  constructor( webhooks: string[] ) {
    this.webhooks = webhooks;
    this.webhooks.forEach((url) => {
      this.addWebhook1(url);
    });
  }

  public async addWebhook(webhook: string) {
    this.webhooks.push(webhook);
    await fs.writeFile('./js/webhooks.json', JSON.stringify(this.webhooks));
  }

  public getWebhooks(): Webhook[] {
    return this.webhooksList;
  }

  public sendMessageToAll(msg: string): void {
    this.webhooksList.forEach((webhook) => {
      webhook.send(msg);
    });
  }

  private addWebhook1(url: string): void {
    const webhook = new Webhook(url);
    this.webhooksList.push(webhook);
  }
}
