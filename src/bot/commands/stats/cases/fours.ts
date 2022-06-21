import { Message } from 'discord.js';

export default function overall(message: Message<boolean>, player: string, key: string) {
  console.log("Fetching hypixel bedwars stats for " + player, key);
}