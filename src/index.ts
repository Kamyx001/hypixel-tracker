import Tracker from "./Tracker";
import players from "./players.json";
import apiKeys from './apiKeys.json';
import webhooks from './webhooks.json';

const tracker = new Tracker(players, apiKeys, webhooks);

tracker.initialize();