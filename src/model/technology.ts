import data from '../assets/technologies.json';
import { Era, getEra } from './era';

export interface Effects {
  food?: number;
  prod?: number;
  social?: number;
  strength?: number;
  science?: number;
}

export const EFFECTS_NAMES: Array<keyof Effects> = ['food', 'prod', 'social', 'strength', 'science'];

interface TechnologyData {
  id: string;
  name: string;
  rank: number;
  root: boolean;
  effects: Effects;
  previous: Array<string>;
  help: Array<string>;
  text: string;
  era: number;
}

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

  constructor(id: string, name: string, effects: Effects, era: Era) {
    this.id = id;
    this.name = name;
    this.effects = effects;
    this.era = era;
  }
}

export type Card = Technology | Innovation;

const dataMap: Record<string, TechnologyData> = data;
const techsMap = new Map<string, Technology>();
const innovMap = new Map<string, Innovation>();
export const technologies = new Array<Technology>();
export const innovations = new Array<Innovation>();
Object.keys(dataMap).forEach((id) => {
  const t = dataMap[id];
  const era = getEra(t.era);
  const innovs = t.text.split('\n').map((s) => {
    if (!innovMap.has(s)) {
      innovMap.set(s, new Innovation(s, s, {}, era));
    }
    return innovMap.get(s)!;
  });
  const tech = new Technology(t.id, t.name, t.root, t.effects, era,
    t.previous.map((pid) => techsMap.get(pid)!),
    t.help.map((hid) => techsMap.get(hid)!),
    innovs);
  techsMap.set(id, tech);
  technologies.push(tech);
});

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
