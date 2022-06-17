import Command from "../Command";
import DiscordJS from 'discord.js';
import Tracker from "../../Tracker";

export default class RemoveWebhook extends Command {
  constructor() {
    super("removewebhook", "Remove a webhook from the tracker.", "removewebhook <webhook-url>", ["removewebhook", "rmwh"], "admin only", true, true);
  }

  public override run(message: DiscordJS.Message, args: string[], options: { commands: Command[], tracker: Tracker }): void {
    if (args.length < 1) {
      message.channel.send("You must provide a webhook URL.");
      return;
    }
    console.log(args);
    const webhookUrl = args[0];
    options.tracker.removeWebhook(webhookUrl, message);
  }
}