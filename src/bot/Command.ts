import DiscordJS from 'discord.js';

export default class Command {
  private aliases: string[];
  private args: string[]|[];
  private category: string;
  private description: string;
  private enabled: boolean;
  private name: string;
  private ownerOnly: boolean;

  constructor(name: string, description: string, args: string[]|[], aliases: string[], category: string, enabled: boolean, ownerOnly: boolean) {
    this.name = name;
    this.description = description;
    this.args = args;
    this.aliases = aliases;
    this.category = category;
    this.enabled = enabled;
    this.ownerOnly = ownerOnly;
  }

  public run(_message: DiscordJS.Message, _args: string[], _additionalData?: any): void {
    throw new Error("This command has not been implemented.");
  }

  public getAliases(): string[] {
    return this.aliases;
  }

  public getCategory(): string {
    return this.category;
  }

  public getDescription(): string {
    return this.description;
  }

  public getName(): string {
    return this.name;
  }

  public getArgs(): string[]|[] {
    return this.args;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isOwnerOnly(): boolean {
    return this.ownerOnly;
  }
}