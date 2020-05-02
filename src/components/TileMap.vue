<template>
  <div id="tile-map">
    <div id="map">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Hex, Point } from 'honeycomb-grid';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { bus } from '../main';
import {
  Terrain, playerHex, toHex, grid, Tile,
  discoverHex, settleHex,
} from '../model/map';

@Component
export default class TileMap extends Vue {
  static createTextures() {
    const tiles = require.context('../assets/tiles/', false);
    const textures = new Map<Terrain, PIXI.Texture>();
    textures.set(Terrain.UNKNOWN, PIXI.Texture.from(tiles('./hex_blank.png')));
    textures.set(Terrain.DESERT, PIXI.Texture.from(tiles('./hex_desert.png')));
    textures.set(Terrain.GRASS, PIXI.Texture.from(tiles('./hex_grassland.png')));
    textures.set(Terrain.HILLS, PIXI.Texture.from(tiles('./hex_hills.png')));
    textures.set(Terrain.MOUNTAIN, PIXI.Texture.from(tiles('./hex_mountain.png')));
    textures.set(Terrain.SEA, PIXI.Texture.from(tiles('./hex_sea.png')));
    textures.set(Terrain.FOREST, PIXI.Texture.from(tiles('./hex_forest.png')));
    textures.set(Terrain.CITY, PIXI.Texture.from(tiles('./hex_arctic.png')));
    return textures;
  }

  private textures = TileMap.createTextures();

  private viewport?: Viewport;

  private borders?: PIXI.Graphics;

  mounted() {
    const app = new PIXI.Application({
      width: 400,
      height: 400,
      transparent: true,
      antialias: true,
    });
    this.$el.appendChild(app.view);

    this.viewport = new Viewport({
      screenWidth: app.renderer.screen.width,
      screenHeight: app.renderer.screen.height,
      worldWidth: grid.pointWidth(),
      worldHeight: grid.pointHeight(),
      interaction: app.renderer.plugins.interaction,
    });
    // add the viewport to the stage
    app.stage.addChild(this.viewport);
    // activate plugins
    this.viewport
      .drag()
      .pinch()
      .clamp({ direction: 'all' })
      .on('clicked', (data) => this.click(data.world.x, data.world.y));

    grid.forEach(this.setTerrain);

    this.drawSettledTiles();

    const p = playerHex.toPoint();
    this.viewport.moveCenter(new PIXI.Point(p.x, p.y));
  }

  setTerrain(hex: Hex<Tile>) {
    const sprite = new PIXI.Sprite(this.textures.get(hex.terrain));
    const p = hex.toPoint();
    hex.setSprite(sprite);
    sprite.x = p.x;
    sprite.y = p.y;
    this.viewport!.addChild(sprite);
  }

  drawSettledTiles() {
    if (this.borders) {
      // remove old one
      this.viewport!.removeChild(this.borders);
    }

    // collect settled hexagons
    const settled = new Set<Hex<Tile>>();
    const collectSettled = (hex: Hex<Tile>) => {
      settled.add(hex);
      grid.neighborsOf(hex).forEach((neighbor) => {
        if (neighbor.settled && !settled.has(neighbor)) {
          collectSettled(neighbor);
        }
      });
    };
    collectSettled(playerHex);

    // then draw borders with each hexagon that is not settled
    const borders = new PIXI.Graphics();
    // set a line style of 1px wide and color #999
    borders.lineStyle(1, 0xff0000);
    const drawLine = (p1: Point, p2: Point) => {
      borders.moveTo(p1.x, p1.y);
      borders.lineTo(p2.x, p2.y);
    };
    settled.forEach((hex) => {
      //  4_5
      // 3/ \0
      // 2\_/1
      const origin = hex.toPoint();
      const corners = hex.corners().map((corner) => corner.add(origin));
      // cannot use FlatCompassDirection values as the enum values are not transpiled by typescript
      const neighbors = grid.neighborsOf(hex, [0, 1, 2, 3, 4, 5]);
      for (let i = 0; i < 6; i += 1) {
        if (neighbors[i] === undefined || !settled.has(neighbors[i])) {
          drawLine(corners[i], corners[(i + 1) % 6]);
        }
      }
    });

    this.borders = borders;
    this.viewport!.addChild(borders);
  }

  click(x: number, y: number): void {
    const hex = grid.get(toHex(x, y).coordinates());
    if (hex) {
      if (hex.terrain === Terrain.UNKNOWN) {
        // discover the terrain
        discoverHex(hex);
        // and display the new one
        const sprite = hex.sprite as PIXI.Sprite;
        sprite.texture = this.textures.get(hex.terrain)!;
      } else if (!hex.settled) {
        // only settle contiguous tiles
        if (grid.neighborsOf(hex).some((neighbor) => neighbor.settled)) {
          // change hex state
          settleHex(hex);
          // then re-draw the border
          this.drawSettledTiles();
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
