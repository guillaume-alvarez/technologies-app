import { bus } from '../main';
import { WorldMap, Tile, Terrain } from './map';


/**
 * Internal world map, used for display and internal logic.
 * NEVER use it or parts of it as Vue object member:
 * it is to complex and will slow everything down with GC.
 */
export const map = new WorldMap(50, 50);

export class GameState {
  public settledTerrains = new Map<Terrain, number>();

  constructor() {
    Object.keys(Terrain).forEach((k) => {
      const terrain = Terrain[k as keyof typeof Terrain];
      if (terrain !== Terrain.UNKNOWN) {
        this.settledTerrains.set(terrain, 0);
      }
    });
    // cannot use 'bus' here:
    // - GameState constructor is called during import
    // - app has not yet created the bus
    map.settledTiles.forEach((hex) => {
      const nb = this.settledTerrains.get(hex.terrain) || 0;
      this.settledTerrains.set(hex.terrain, nb + 1);
    });
  }

  public settleTile(hex: Tile) {
    map.settleHex(hex); // update map first so that state is consistent
    const nb = this.settledTerrains.get(hex.terrain) || 0;
    this.settledTerrains.set(hex.terrain, nb + 1);
    bus.$emit('settle-tile', hex); // let vue components change their state accordingly
  }
}

export const state = new GameState();
