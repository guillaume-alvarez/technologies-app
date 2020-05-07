<template>
  <div class="tile-map">
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
import { state, map } from '../model/store';

// outside the component: should not be monitored
console.log('Start PIXI rendering...');
const app = new PIXI.Application({
  width: 400,
  height: 400,
  transparent: true,
  antialias: true,
});

const viewport = new Viewport({
  screenWidth: app.renderer.screen.width,
  screenHeight: app.renderer.screen.height,
  worldWidth: map.pointWidth(),
  worldHeight: map.pointHeight(),
  interaction: app.renderer.plugins.interaction,
});

const borders = new PIXI.Graphics();

const textures = new Map<Terrain, PIXI.Texture>();

function setTerrain(hex: Tile) {
  const sprite = new PIXI.Sprite(textures.get(hex.terrain));
  sprite.renderable = hex.isDiscovered();
  const p = hex.toPoint();
  hex.setSprite(sprite);
  sprite.x = p.x;
  sprite.y = p.y;
  viewport.addChild(sprite);
}

/**
 * Draw borders with each hexagon that is not settled.
 */
function drawSettledTiles() {
  borders.clear();

  // set a line style of 1px wide and color #999
  borders.lineStyle(1, 0xff0000);
  const drawLine = (p1: Point, p2: Point) => {
    borders.moveTo(p1.x, p1.y);
    borders.lineTo(p2.x, p2.y);
  };
  map.settledTiles.forEach((hex) => {
    //  4_5
    // 3/ \0
    // 2\_/1
    const origin = hex.toPoint();
    const corners = hex.corners().map((corner) => corner.add(origin));
    // cannot use FlatCompassDirection values as the enum values are not transpiled by typescript
    const neighbors = map.grid.neighborsOf(hex, [0, 1, 2, 3, 4, 5]);
    for (let i = 0; i < 6; i += 1) {
      if (neighbors[i] === undefined || !map.settledTiles.includes(neighbors[i])) {
        drawLine(corners[i], corners[(i + 1) % 6]);
      }
    }
  });
}

@Component
export default class TileMap extends Vue {
  mounted() {
    this.$el.querySelector('#map')!.appendChild(app.view);
    // add the viewport to the stage
    app.stage.addChild(viewport);
    // activate plugins
    viewport
      .drag()
      .clamp({ direction: 'all' })
      .on('clicked', (data) => this.click(data.world.x, data.world.y));

    const p = map.playerHex.toPoint();
    viewport.moveCenter(new PIXI.Point(p.x, p.y));

    const tiles = require.context('../assets/tiles/', false);
    const spritesheetData = tiles('./tiles_spritesheet.json');
    PIXI.Loader.shared.reset();
    PIXI.Loader.shared
      .add('tiles_spritesheet', tiles('./tiles_spritesheet.png'))
      .load((loader, resources) => {
        const sheet = new PIXI.Spritesheet(resources!.tiles_spritesheet!.texture!, spritesheetData);
        sheet.parse(() => {
          textures.set(Terrain.UNKNOWN, sheet.textures['hex_blank.png']);
          textures.set(Terrain.DESERT, sheet.textures['hex_desert.png']);
          textures.set(Terrain.GRASS, sheet.textures['hex_grassland.png']);
          textures.set(Terrain.HILLS, sheet.textures['hex_hills.png']);
          textures.set(Terrain.MOUNTAIN, sheet.textures['hex_mountain.png']);
          textures.set(Terrain.SEA, sheet.textures['hex_sea.png']);
          textures.set(Terrain.FOREST, sheet.textures['hex_forest.png']);
          textures.set(Terrain.CITY, sheet.textures['hex_arctic.png']);

          map.grid.forEach(setTerrain);

          viewport.addChild(borders);
          drawSettledTiles();
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  click(x: number, y: number): void {
    const hex = map.grid.get(map.toHex(x, y).coordinates());
    if (hex) {
      if (!hex.isDiscovered()) {
        if (map.grid.neighborsOf(hex).some((neighbor) => neighbor.isDiscovered())) {
          // discover the terrain
          map.discoverHex(hex);
          // and display the new one
          const sprite = hex.sprite as PIXI.Sprite;
          sprite.texture = textures.get(hex.terrain)!;
        }
      } else if (!hex.settled) {
        // only settle contiguous tiles
        if (map.grid.neighborsOf(hex).some((neighbor) => neighbor.settled)) {
          // change hex state
          state.settleTile(hex);
          // then re-draw the border
          drawSettledTiles();
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile-map {
  background-image: url("../assets/parch-texture.png");
  border-radius: 0.5em; /* slightly round corner, like physical cards */
}
</style>
