import { WorldMap, Tile, Terrain } from './map';

export class GameState {
  /**
   * Internal world map, used for display and internal logic.
   * NEVER use it or parts of it as Vue object member: it is to complex and will slow everything down with GC.
   */
  public readonly map = new WorldMap(50, 50);

  public readonly settledTerrains = new Map<Terrain, number>();

  constructor() {
    Object.keys(Terrain).forEach((k) => {
      const terrain = Terrain[k as keyof typeof Terrain];
      if (terrain !== Terrain.UNKNOWN) {
        this.settledTerrains.set(terrain, 0);
      }
    });
  }

  public settleTile(hex: Tile) {
    this.map.settleHex(hex);
    let nb = this.settledTerrains.get(hex.terrain) || 0;
    nb += 1;
    this.settledTerrains.set(hex.terrain, nb);
  }
}

export const state = new GameState();
