import data from './assets/technologies.json';

export interface Technology {
  id: string;
  name: string;
  text: string;
  rank: number;
  root: boolean;
}

const map: Record<string, Technology> = data;

export const technologies: Array<Technology> = Object.entries(data).map(([key, value]) => value);

export function getTechnology(id: string) {
  return map[id];
}
