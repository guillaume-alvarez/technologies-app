/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-param-reassign: ["error", { "props": false }] */
import { extendHex, defineGrid, Hex } from 'honeycomb-grid';
import { shuffle } from '../utils';

export enum Terrain {
  UNKNOWN = 'Unknown',
  GRASS = 'Grass',
  HILLS = 'Hills',
  MOUNTAIN = 'Mountain',
  SEA = 'Sea',
  FOREST = 'Forest',
  DESERT = 'Desert',
  CITY = 'City',
}

const HEX_HEIGHT = 38;
const HEX_WIDTH = 45;

export interface Tile {
  size: {
    height: number;
    width: number;
  };
  orientation: string;
  terrain: Terrain;
  sprite: any;
  setSprite(sprite: any): void;
}

const HexF = extendHex({
  size: { height: HEX_HEIGHT, width: HEX_WIDTH },
  orientation: 'flat',
  terrain: Terrain.UNKNOWN, // unknown by default
  sprite: {},
  setSprite(sprite: any) {
    this.sprite = sprite;
  },
});
const GridF = defineGrid(HexF);
export const grid = GridF.rectangle({ width: 50, height: 50 });

export function toHex(x: number, y: number) {
  return GridF.pointToHex(x, y);
}

const TERRAIN_CHANCES = [
  Terrain.GRASS, Terrain.GRASS, Terrain.FOREST, Terrain.FOREST,
  Terrain.MOUNTAIN, Terrain.HILLS, Terrain.DESERT, Terrain.SEA,
];

// fill center of the grid
export const playerHex = grid.get({ x: 25, y: 25 })!;
function initTerrains() {
  playerHex.terrain = Terrain.CITY;
  const terrains = shuffle(TERRAIN_CHANCES);
  grid.neighborsOf(playerHex).forEach((hex) => {
    hex.terrain = terrains.pop()!;
  });
}
initTerrains();

export function discoverHex(hex: Hex<Tile>) {
  let terrains = shuffle(TERRAIN_CHANCES);
  grid.neighborsOf(hex).forEach((h) => {
    if (h.terrain !== Terrain.UNKNOWN) {
      // remove a random default terrain from start (from 8, no risk to lose all)
      terrains.splice(0, 1);
      // add a neighbor terrain at end to increase its odds
      terrains.push(h.terrain);
    }
  });
  // reshuffle and pick
  terrains = shuffle(terrains);
  console.log('Choose one from %s', terrains);
  hex.terrain = terrains.pop()!;
}
