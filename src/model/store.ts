import { bus } from '../main';
import { WorldMap, Tile, Terrain } from './map';
import {
  Card, Technology,
  technologies, includesPrevious,
} from './technology';


/**
 * Internal world map, used for display and internal logic.
 * NEVER use it or parts of it as Vue object member:
 * it is to complex and will slow everything down with GC.
 */
export const map = new WorldMap(50, 50);

export class GameState {
  public readonly settledTerrains = new Map<Terrain, number>();

  public readonly pastCards = new Map<string, Card>();

  public readonly presentCards = new Map<string, Card>();

  public readonly futureCards = new Map<string, Card>();

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

    // init tiles
    map.settledTiles.forEach((hex) => {
      const nb = this.settledTerrains.get(hex.terrain) || 0;
      this.settledTerrains.set(hex.terrain, nb + 1);
    });

    // init cards
    technologies
      .filter((card) => card instanceof Technology && card.root)
      .forEach((tech) => this.presentCards.set(tech.id, tech));
    this.updateFutureCards();
  }

  private updateFutureCards() {
    technologies
      // tech not already discovered
      .filter((tech) => !this.pastCards.has(tech.id))
      .filter((tech) => !this.presentCards.has(tech.id))
      // tech can be discovered
      // eslint-disable-next-line max-len
      .filter((tech) => includesPrevious(tech, Array.from(this.presentCards.values()))
        || includesPrevious(tech, Array.from(this.pastCards.values())))
      .forEach((tech) => this.futureCards.set(tech.id, tech));
  }

  public settleTile(hex: Tile) {
    map.settleHex(hex); // update map first so that state is consistent
    const nb = this.settledTerrains.get(hex.terrain) || 0;
    this.settledTerrains.set(hex.terrain, nb + 1);
    bus.$emit('settle-tile', hex); // let vue components change their state accordingly
  }

  public selectCard(card: Card): void {
    if (this.futureCards.delete(card.id)) {
      this.presentCards.set(card.id, card);

      // also push previous to past
      if (card instanceof Technology) {
        card.previous.forEach((previous) => {
          if (this.presentCards.delete(previous.id)) {
            this.pastCards.set(previous.id, previous);
          }
        });
      }

      // and compute new futures cards
      this.futureCards.clear();
      this.updateFutureCards();
    } else if (this.presentCards.delete(card.id)) {
      this.pastCards.set(card.id, card);
    }
    bus.$emit('change-cards');
  }
}

export const state = new GameState();
