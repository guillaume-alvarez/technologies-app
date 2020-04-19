import data from './assets/technologies.json';

export interface Effects {
  food?: number;
  prod?: number;
  social?: number;
  strength?: number;
  tech?: number;
}

export interface Technology {
  id: string;
  name: string;
  rank: number;
  root: boolean;
  effects: Effects;
  previous: Array<string>;
  help: Array<string>;
  text: string;
}

const map: Record<string, Technology> = data;

export const technologies: Array<Technology> = Object.entries(data).map(([key, value]) => value);

export function getTechnology(id: string) {
  return map[id];
}
