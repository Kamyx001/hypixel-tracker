import Tracker from "./Tracker";
import apiKeysJSON from './apiKeys.json';
import PlayerList from "./PlayerList";


const players = new PlayerList();

const tracker = new Tracker(apiKeysJSON, players);

tracker.initialize();