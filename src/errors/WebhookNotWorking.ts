


export default class WebhookNotWorking extends Error {
  constructor(webhookUrl: string) {
    super(`Webhook not working: ${webhookUrl}`);
  }
}