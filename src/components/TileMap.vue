<template>
  <div id="tile-map">
    <div id="map">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Hex } from 'honeycomb-grid';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { bus } from '../main';
import {
  Terrain, playerHex, toHex, grid, discoverHex, Tile,
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

  mounted() {
    const app = new PIXI.Application({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      transparent: true,
      antialias: true,
    });
    this.$el.appendChild(app.view);

    this.viewport = new Viewport({
      screenWidth: app.renderer.screen.width,
      screenHeight: app.renderer.screen.height,
      worldHeight: grid.pointHeight(),
      worldWidth: grid.pointWidth(),
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

  click(x: number, y: number): void {
    const hex = grid.get(toHex(x, y).coordinates());
    if (hex) {
      if (hex.terrain === Terrain.UNKNOWN) {
        // discover the terrain
        discoverHex(hex);
        // and display the new one
        const sprite = hex.sprite as PIXI.Sprite;
        this.viewport!.removeChild(sprite);
        this.setTerrain(hex);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
