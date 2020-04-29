/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-param-reassign: ["error", { "props": false }] */
import { extendHex, defineGrid, BaseHex } from 'honeycomb-grid';
import { shuffle } from '../utils';

export enum Terrain {
  UNKNOWN, GRASS, HILLS, MOUNTAIN, SEA, FOREST, CITY,
}

export const HEX_HEIGHT = 38;
export const HEX_WIDTH = 45;

const Hex = extendHex({
  size: { height: HEX_HEIGHT, width: HEX_WIDTH },
  orientation: 'flat',
  terrain: Terrain.UNKNOWN, // unknown by default
});
const Grid = defineGrid(Hex);
export const grid = Grid.rectangle({ width: 50, height: 50 });

export function toHex(x: number, y: number) {
  return Grid.pointToHex(x, y);
}

// fill center of the grid
export const playerHex = grid.get({ x: 25, y: 25 })!;
playerHex.terrain = Terrain.CITY;
const terrains = shuffle([
  Terrain.GRASS, Terrain.GRASS, Terrain.GRASS, Terrain.SEA,
  Terrain.MOUNTAIN, Terrain.HILLS, Terrain.FOREST, Terrain.FOREST,
]);
grid.neighborsOf(playerHex).forEach((hex) => {
  hex.terrain = terrains.pop()!;
});
