import { bus } from '../main';
import { WorldMap, Tile, Terrain } from './map';
import {
  Card, Technology,
  technologies, includesPrevious, innovations,
} from './technology';
import { remove, shuffle } from '../utils';
import { eras } from './era';


const MAX_FUTURE_CARDS = 12;

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

  public readonly futureCards = new Array<Card>();

  public readonly current = {
    food: 0,
    prod: 0,
    social: 0,
    strength: 0,
    science: 0,
  };

  public readonly gain = {
    food: 0,
    prod: 0,
    social: 0,
    strength: 0,
    science: 0,
  };

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
      .forEach((tech) => this.addPresentCard(tech));
    this.accumulateResources(); // from initial cards
    this.updateFutureCards(MAX_FUTURE_CARDS);
  }

  private updateFutureCards(nb: number) {
    const candidates = [...technologies, ...innovations]
      // tech not already discovered
      .filter((card) => !this.pastCards.has(card.id))
      .filter((card) => !this.presentCards.has(card.id))
      .filter((card) => !this.futureCards.includes(card))
      // tech can be discovered
      // eslint-disable-next-line max-len
      .filter((card) => includesPrevious(card, Array.from(this.presentCards.values()))
        || includesPrevious(card, Array.from(this.pastCards.values())))
      .filter((card) => card instanceof Technology // always let player see the science cost
        || !this.settledTerrains.has(card.cost)
        || this.settledTerrains.get(card.cost)! > 0);
    shuffle(candidates)
      .sort((c1, c2) => c1.era.compareTo(c2.era))
      .slice(0, nb)
      .forEach((card) => this.futureCards.push(card));
  }

  public settleTile(hex: Tile) {
    map.settleHex(hex); // update map first so that state is consistent
    const nb = this.settledTerrains.get(hex.terrain) || 0;
    this.settledTerrains.set(hex.terrain, nb + 1);
    bus.$emit('settle-tile', hex); // let vue components change their state accordingly

    // may allow more cards
    const requiredCards = MAX_FUTURE_CARDS - this.futureCards.length;
    if (requiredCards > 0) {
      this.updateFutureCards(requiredCards);
      bus.$emit('change-cards');
    }
  }

  public selectCard(card: Card): void {
    if (remove(this.futureCards, card)) {
      this.addPresentCard(card);

      // also push previous to past
      if (card instanceof Technology) {
        card.previous.forEach((previous) => this.obsoletePresentCard(previous));
      }

      // and accumulate resources
      this.accumulateResources();

      // and compute new futures cards
      this.updateFutureCards(MAX_FUTURE_CARDS - this.futureCards.length);
    } else if (this.presentCards.delete(card.id)) {
      this.pastCards.set(card.id, card);
    }
    bus.$emit('change-cards');
  }

  private accumulateResources() {
    this.current.food += this.gain.food;
    this.current.prod += this.gain.prod;
    this.current.science += this.gain.science;
    this.current.social += this.gain.social;
    this.current.strength += this.gain.strength;
  }

  private addPresentCard(card: Card) {
    this.presentCards.set(card.id, card);

    this.gain.food += card.effects.food || 0;
    this.gain.prod += card.effects.prod || 0;
    this.gain.science += card.effects.science || 0;
    this.gain.social += card.effects.social || 0;
    this.gain.strength += card.effects.strength || 0;
  }

  private obsoletePresentCard(card: Card) {
    if (this.presentCards.delete(card.id)) {
      this.pastCards.set(card.id, card);
    }

    this.gain.food -= card.effects.food || 0;
    this.gain.prod -= card.effects.prod || 0;
    this.gain.science -= card.effects.science || 0;
    this.gain.social -= card.effects.social || 0;
    this.gain.strength -= card.effects.strength || 0;
  }
}

export const state = new GameState();
