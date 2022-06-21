import Webhook from "./Webhook";
import fs from 'fs/promises';
import DiscordJS from 'discord.js';

export default class WebhooksManager {
  private webhooks: string[];
  private webhooksList: Webhook[] = [];

  constructor( webhooks: string[] ) {
    this.webhooks = webhooks;
    this.webhooks.forEach((url) => {
      this.addWebhook1(url);
    });
  }

  public async addWebhook(webhook: string, message: DiscordJS.Message) {
    if (!webhook.startsWith("https://discordapp.com/api/webhooks/")) {
      message.channel.send("This is not a valid webhook URL.");
      return;
    }
    if (this.webhooks.find((wh) => {wh === webhook})) {
      message.channel.send("Webhook already exists.");
      return;
    }
    this.webhooks.push( webhook );
    this.addWebhook1( webhook );

    message.channel.send(`Webhook added: ${webhook}`);

    await fs.writeFile('./js/webhooks.json', JSON.stringify(this.webhooks));
    await fs.writeFile('./src/webhooks.json', JSON.stringify(this.webhooks));
  }

  public async removeWebhook(webhook: string, message: DiscordJS.Message) {
    // if (!this.webhooks.find((wh) => {wh === webhook})) {
    //   message.channel.send("This webhook does not exist.");
    //   return;
    // }

    this.webhooks = this.webhooks.filter((url) => {
      return url !== webhook;
    });

    this.webhooksList = this.webhooksList.filter((wh) => {
      return wh.getUrl() !== webhook;
    });

    message.channel.send(`Webhook removed: ${webhook}`);

    await fs.writeFile('./js/webhooks.json', JSON.stringify(this.webhooks));
    await fs.writeFile('./src/webhooks.json', JSON.stringify(this.webhooks));
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
