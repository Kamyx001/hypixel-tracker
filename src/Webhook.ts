import { WebhookClient } from 'discord.js';


export default class Webhook {
    private id: string;
    private token: string;
    private webhook: WebhookClient;
    constructor( url: string ) {
        [this.id, this.token] = url.replace('https://discord.com/api/webhooks/', '').split('/');
        this.webhook = new WebhookClient({ id: this.id, token: this.token });
    }

    public send( msg: string ) {
        this.webhook.send({ content: msg });
    }
}