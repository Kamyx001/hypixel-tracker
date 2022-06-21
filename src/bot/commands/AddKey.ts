import Command from "../Command";
import { Message } from "discord.js";

export default class AddKey extends Command {
  constructor() {
    super("addkey", "Adds an API key to the tracker", ["key"], ["addkey"], "tracker", true, false);
  }

  public override async run(message: Message, args: string[], additionalData: any): Promise<void> {
    message.delete();
    if ( additionalData.tracker.getApiKeys().find((apiKey: any) => apiKey === args[0]) ) {
      message.channel.send(`${args[0]} is already in the tracker.`);
      return;
    }
    if (args.length < 1) {
      message.channel.send("Please provide an API key.");
      return;
    }
    const apiKey = args[0];
    let data = await additionalData.tracker.fetchUsage( apiKey );
    let isWorking = data.success;
    if (!isWorking) {
      message.channel.send(`This api key does not work.`);
      return;
    };
    await additionalData.tracker.addApiKey(apiKey);
    let ownerData = await fetch(`https://mc-heads.net/minecraft/profile/${data.record.owner}`).then(res => res.json());
    let ownerName = ownerData.name;
    message.channel.send(`Added API key belonging to ${ownerName} to the tracker.`);
  }
}