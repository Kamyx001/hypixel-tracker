import Command from "./Command";

export default class CommandManager {
  private commands: Command[];

  constructor( commands: Command[] ) {
    this.commands = commands;
  }

  public getCommand(commandName: string): Command | undefined {
    return this.commands.find((command) => command.getName() === commandName);
  }

  public getCommands(): Command[] {
    return this.commands;
  }
}