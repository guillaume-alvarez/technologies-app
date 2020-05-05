<template>
  <div id="tile-map">
    <div id="map">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from 'honeycomb-grid';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { bus } from '../main';
import { Terrain, Tile } from '../model/map';
import { state } from '../model/store';


@Component
export default class TileMap extends Vue {
  private textures = new Map<Terrain, PIXI.Texture>();

  private viewport?: Viewport;

  private borders?: PIXI.Graphics;

  mounted() {
    console.log('Start PIXI rendering...');
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
      worldWidth: state.map.pointWidth(),
      worldHeight: state.map.pointHeight(),
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

    const p = state.map.playerHex.toPoint();
    this.viewport.moveCenter(new PIXI.Point(p.x, p.y));

    const assets = require.context('../assets/', false);
    const tiles = require.context('../assets/tiles/', false);
    const spritesheetData = tiles('./tiles_spritesheet.json');
    PIXI.Loader.shared
      .add('tiles_spritesheet', tiles('./tiles_spritesheet.png'))
      .add(assets('./parch-texture.png'))
      .load((loader, resources) => {
        const sheet = new PIXI.Spritesheet(resources!.tiles_spritesheet!.texture!, spritesheetData);
        sheet.parse(() => {
          this.textures.set(Terrain.UNKNOWN, sheet.textures['hex_blank.png']);
          this.textures.set(Terrain.DESERT, sheet.textures['hex_desert.png']);
          this.textures.set(Terrain.GRASS, sheet.textures['hex_grassland.png']);
          this.textures.set(Terrain.HILLS, sheet.textures['hex_hills.png']);
          this.textures.set(Terrain.MOUNTAIN, sheet.textures['hex_mountain.png']);
          this.textures.set(Terrain.SEA, sheet.textures['hex_sea.png']);
          this.textures.set(Terrain.FOREST, sheet.textures['hex_forest.png']);
          this.textures.set(Terrain.CITY, sheet.textures['hex_arctic.png']);

          state.map.grid.forEach(this.setTerrain);
          this.drawSettledTiles();
        });
      });
  }

  private setTerrain(hex: Tile) {
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

    // then draw borders with each hexagon that is not settled
    const borders = new PIXI.Graphics();
    // set a line style of 1px wide and color #999
    borders.lineStyle(1, 0xff0000);
    const drawLine = (p1: Point, p2: Point) => {
      borders.moveTo(p1.x, p1.y);
      borders.lineTo(p2.x, p2.y);
    };
    state.map.settledTiles.forEach((hex) => {
      //  4_5
      // 3/ \0
      // 2\_/1
      const origin = hex.toPoint();
      const corners = hex.corners().map((corner) => corner.add(origin));
      // cannot use FlatCompassDirection values as the enum values are not transpiled by typescript
      const neighbors = state.map.grid.neighborsOf(hex, [0, 1, 2, 3, 4, 5]);
      for (let i = 0; i < 6; i += 1) {
        if (neighbors[i] === undefined || !state.map.settledTiles.includes(neighbors[i])) {
          drawLine(corners[i], corners[(i + 1) % 6]);
        }
      }
    });

    this.borders = borders;
    this.viewport!.addChild(borders);
  }

  click(x: number, y: number): void {
    const hex = state.map.grid.get(state.map.toHex(x, y).coordinates());
    if (hex) {
      if (!hex.isDiscovered()) {
        if (state.map.grid.neighborsOf(hex).some((neighbor) => neighbor.isDiscovered())) {
          // discover the terrain
          state.map.discoverHex(hex);
          // and display the new one
          const sprite = hex.sprite as PIXI.Sprite;
          sprite.texture = this.textures.get(hex.terrain)!;
        }
      } else if (!hex.settled) {
        // only settle contiguous tiles
        if (state.map.grid.neighborsOf(hex).some((neighbor) => neighbor.settled)) {
          // change hex state
          state.map.settleHex(hex);
          // then re-draw the border
          this.drawSettledTiles();
          bus.$emit('settle-tile', hex);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
