import Command from "../../Command";
import { Message } from "discord.js";
import { overall, solo, doubles, threes, fours } from "./cases";

export default class Bedwars extends Command {
  
  private whichKey = 0;
  
  constructor() {
    super("bedwars", "Shows players hypixel bedwars stats", ["player", "mode"], ["bedwars", "bw"], "stats", true, false);
  }

  public override run(message: Message<boolean>, args: string[], additionalData?: any): void {
    let player = args[0];
    let mode = args[1];
    
    if (player == undefined) {
      message.channel.send(">>> Usage: `!bedwars <player> <mode>`\n\n<player> is the name of the player you want to check.\n<mode> is the mode you want to check.\n\nAvailable modes: `overall`, `solo`, `doubles`, `threes`, `fours`");
      return;
    }

    if (mode == undefined) {
      mode = "overall";
    }

    if (mode == "overall") {
      overall(message, player, additionalData.tracker.getApiKeys()[this.whichKey]);
    }

    if (mode == "solo") {
      solo(message, player, additionalData.tracker.getApiKeys()[this.whichKey]);
    }

    if (mode == "doubles") {
      doubles(message, player, additionalData.tracker.getApiKeys()[this.whichKey]);
    }

    if (mode == "threes") {
      threes(message, player, additionalData.tracker.getApiKeys()[this.whichKey]);
    }

    if (mode == "fours") {
      fours(message, player, additionalData.tracker.getApiKeys()[this.whichKey]);
    }

    this.whichKey++;
  }
  
}