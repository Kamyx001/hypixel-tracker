import Tracker from "./Tracker";
import apiKeysJSON from './apiKeys.json';


const tracker = new Tracker(apiKeysJSON);

tracker.initialize();