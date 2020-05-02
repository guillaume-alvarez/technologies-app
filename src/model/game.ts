import { Grid, Hex } from 'honeycomb-grid';
import { grid, Tile } from './map';

export default class GameState {
  public readonly grid: Grid<Tile>;

  constructor() {
    this.grid = grid;
  }

  public discoverTile(hex: Hex<Tile>) {
    
  }

}