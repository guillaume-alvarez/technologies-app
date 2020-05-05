import { WorldMap } from './map';

export class GameState {
  map = new WorldMap(50, 50);
}

export const state = new GameState();
