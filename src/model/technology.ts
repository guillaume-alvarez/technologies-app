import technologiesData from '../assets/technologies.json';
import innovationsData from '../assets/innovations.json';
import { Era, getEra } from './era';
import { Terrain, randomTerrain } from './map';

export interface Effects extends Record<string, number | undefined> {
  food?: number;
  prod?: number;
  social?: number;
  strength?: number;
  science?: number;
}

export const EFFECTS_NAMES: Array<keyof Effects> = ['food', 'prod', 'social', 'strength', 'science'];

export class Technology {
  readonly id: string;

  readonly name: string;

  readonly root: boolean;

  readonly effects: Effects;

  readonly previous: Array<Technology>;

  readonly help: Array<Technology>;

  readonly era: Era;

  readonly cost: number;

  readonly innovations: Array<Innovation>;

  constructor(id: string, name: string, root: boolean, effects: Effects, era: Era,
    previous: Array<Technology>, help: Array<Technology>, innovations: Array<Innovation>) {
    this.id = id;
    this.name = name;
    this.root = root;
    this.effects = effects;
    this.previous = previous;
    this.help = help;
    this.era = era;
    this.cost = 2 * era.id + 1;
    this.innovations = innovations;
  }
}

/**
 * Specific use case of a braoder technology, like cows for domestication technology.
 */
export class Innovation {
  readonly id: string;

  readonly name: string;

  readonly effects: Effects;

  readonly era: Era;

  readonly cost: Terrain;

  readonly technologies = new Array<Technology>();

  constructor(id: string, name: string, effects: Effects, era: Era, cost: Terrain) {
    this.id = id;
    this.name = name;
    this.effects = effects;
    this.era = era;
    this.cost = cost;
  }
}

export type Card = Technology | Innovation;

const innovMap = new Map<string, Innovation>(innovationsData.map((d) => [d.id,
  new Innovation(d.id, d.name, d.effects, getEra(d.era), d.cost as Terrain),
]));

const techsMap = new Map<string, Technology>();
Object.values(technologiesData).forEach((t) => {
  const era = getEra(t.era);
  const innovs = t.text.split('\n').map((s) => {
    if (innovMap.has(s)) {
      return innovMap.get(s)!;
    }
    console.warn('Cannot get innovation %s in %s', s, t.id);
    return new Innovation(s, s, t.effects, era, randomTerrain());
  });
  const tech = new Technology(t.id, t.name, t.root, t.effects, era,
    t.previous.map((pid) => techsMap.get(pid)!),
    t.help.map((hid) => techsMap.get(hid)!),
    innovs);
  techsMap.set(t.id, tech);
  tech.innovations.forEach((i) => i.technologies.push(tech));
});

export const technologies = Array.from(techsMap.values());
export const innovations = Array.from(innovMap.values());

export function getTechnology(id: string) {
  return techsMap.get(id);
}

/**
 * @returns true if all 'previous' for tech are in the array.
 */
export function includesPrevious(card: Card, array: Array<Card>): boolean {
  if (card instanceof Technology) {
    return card.previous.every((previous) => array.some((t) => t === previous));
  }
  if (card instanceof Innovation) {
    return array
      .filter((c) => c instanceof Technology)
      .some((t) => (t as Technology).innovations.includes(card));
  }
  return false;
}
