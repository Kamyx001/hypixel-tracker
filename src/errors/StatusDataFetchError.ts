export class StatusDataFetchError extends Error {
  constructor(uuid: string) {
    super(`Could not fetch status data for uuid: ${uuid}`);
  }
}