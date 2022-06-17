import Command from "../Command";
import DiscordJS from "discord.js";


export default class ApiKeys extends Command {
  constructor() {
    super("apikeys", "Shows the API keys", "apikeys", ["apikeys"], "tracker", true, false);
  }

  public override async run(message: DiscordJS.Message, _args: string[], additionalData: any): Promise<void> {
    let apiKeys = "";
    await additionalData.tracker.getApiKeys().forEach(async (apiKey: any) => {
      let usage = await additionalData.tracker.fetchUsage(apiKey);
      apiKeys += `\n${usage.success ? "+" : "-"} ${apiKey.slice(0, 8)}-... - totalQueries: ${usage.record.totalQueries}`;
    });
    // wait for apiKeys to be populated
    setTimeout(() => {
      message.channel.send(`\`\`\`Diff\n${additionalData.tracker.getApiKeys().length} api keys:${apiKeys}\`\`\``);
    }, 2000);
    
  }
  
  
}

