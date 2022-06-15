export class PlayerDataFetchError extends Error {
  constructor(uuid: string) {
    super(`Could not fetch player data for uuid: ${uuid}`);
  }
}