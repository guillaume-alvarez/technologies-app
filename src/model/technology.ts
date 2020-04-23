import data from '../assets/technologies.json';
import { Era, getEra } from './era';

export interface Effects {
  food?: number;
  prod?: number;
  social?: number;
  strength?: number;
  tech?: number;
}

export const EFFECTS_NAMES: Array<keyof Effects> = ['food', 'prod', 'social', 'strength', 'tech'];

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
  id: string;

  name: string;

  root: boolean;

  effects: Effects;

  previous: Array<Technology>;

  help: Array<Technology>;

  text: string;

  era: Era;

  constructor(id: string, name: string, root: boolean, effects: Effects, text: string, era: Era,
    previous: Array<Technology>, help: Array<Technology>) {
    this.id = id;
    this.name = name;
    this.root = root;
    this.effects = effects;
    this.previous = previous;
    this.help = help;
    this.text = text;
    this.era = era;
  }
}

const dataMap: Record<string, TechnologyData> = data;
const map = new Map<string, Technology>();
export const technologies = new Array<Technology>();
Object.keys(dataMap).forEach((id) => {
  const t = dataMap[id];
  const tech = new Technology(t.id, t.name, t.root, t.effects, t.text, getEra(t.era),
    t.previous.map((pid) => map.get(pid)!),
    t.help.map((hid) => map.get(hid)!));
  map.set(id, tech);
  technologies.push(tech);
});

export function getTechnology(id: string) {
  return map.get(id);
}

/**
 * @returns true if all 'previous' for tech are in the array.
 */
export function includesPrevious(tech: Technology, array: Array<Technology>): boolean {
  return tech.previous.every((previous) => array.some((t) => t === previous));
}
