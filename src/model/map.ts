/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint object-shorthand: "warn" */
/* eslint class-methods-use-this: "warn" */
import {
  Grid, Hex, GridFactory,
  defineGrid, extendHex,
} from 'honeycomb-grid';
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

const DEFAULT_TERRAIN_ODDS = [
  Terrain.GRASS, Terrain.GRASS, Terrain.FOREST, Terrain.FOREST,
  Terrain.MOUNTAIN, Terrain.HILLS, Terrain.DESERT, Terrain.SEA,
];

const HEX_HEIGHT = 38;
const HEX_WIDTH = 45;

export interface TileData {
  size: {
    height: number;
    width: number;
  };
  orientation: string;
  terrain: Terrain;
  sprite: any;
  setSprite(sprite: any): void;
  settled: boolean;
  isDiscovered(): boolean;
}

export type Tile = Hex<TileData>;

export class WorldMap {
  public grid!: Grid<Tile>;

  public playerHex!: Tile;

  private GridF!: GridFactory<Tile>;

  private settled = new Array<Tile>();

  constructor(width: number, height: number) {
    const HexF = extendHex({
      size: { height: HEX_HEIGHT, width: HEX_WIDTH },
      orientation: 'flat',
      terrain: Terrain.UNKNOWN, // unknown by default
      sprite: {},
      setSprite(sprite: any) {
        this.sprite = sprite;
      },
      settled: false,
      isDiscovered() {
        return this.terrain !== Terrain.UNKNOWN;
      },
    });
    this.GridF = defineGrid(HexF) as GridFactory<Tile>;
    this.grid = this.GridF.rectangle({ width: width, height: width });
    this.playerHex = this.grid.get({ x: width / 2, y: height / 2 })!;
    this.settleHex(this.playerHex);

    this.playerHex.terrain = Terrain.CITY;
    const terrains = shuffle(DEFAULT_TERRAIN_ODDS);
    this.grid.neighborsOf(this.playerHex).forEach((hex) => {
      hex.terrain = terrains.pop()!;
    });
  }

  public toHex(x: number, y: number): Tile {
    return this.GridF.pointToHex(x, y);
  }

  public discoverHex(hex: Tile) {
    let terrains = shuffle(DEFAULT_TERRAIN_ODDS);
    this.grid.neighborsOf(hex).forEach((h) => {
      if (h.isDiscovered()) {
        // remove a random default terrain from start (from 8, no risk to lose all)
        terrains.splice(0, 1);
        // add a neighbor terrain at end to increase its odds
        terrains.push(h.terrain);
      }
    });
    // reshuffle and pick
    terrains = shuffle(terrains);
    hex.terrain = terrains.pop()!;
    console.log('Discovered %s hex [%s, %s]', hex.terrain, hex.coordinates().x, hex.coordinates().y);
  }

  public settleHex(hex: Tile) {
    if (!this.settled.includes(hex)) {
      hex.settled = true;
      console.log('Settled %s hex [%s, %s]', hex.terrain, hex.coordinates().x, hex.coordinates().y);
      this.settled.push(hex);
    }
  }

  public pointWidth() {
    return this.grid.pointWidth();
  }

  public pointHeight() {
    return this.grid.pointHeight();
  }

  get settledTiles() {
    return this.settled;
  }
}
