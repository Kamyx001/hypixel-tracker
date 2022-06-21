import Tracker from "./tracker/Tracker";
import players from "./players.json";
import apiKeys from './apiKeys.json';
import webhooks from './webhooks.json';
import Bot from './bot/Bot';
import dotenv from 'dotenv';

dotenv.config();

const tracker = new Tracker(players, apiKeys, webhooks);

tracker.initialize();

new Bot( process.env.DISCORD_TOKEN!, tracker );