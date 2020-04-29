<template>
  <div id="map">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Grid, Hex } from 'honeycomb-grid';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { bus } from '../main';
import {
  Terrain, playerHex, toHex,
  HEX_HEIGHT, HEX_WIDTH,
} from '../model/map';

@Component
export default class TileMap extends Vue {
  @Prop() private map!: Grid;

  private textures = new Map<Terrain, PIXI.Texture>();

  mounted() {
    const app = new PIXI.Application({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
      transparent: true,
      antialias: true,
    });
    this.$el.appendChild(app.view);

    const tiles = require.context('../assets/tiles/', false);
    this.textures.set(Terrain.UNKNOWN, PIXI.Texture.from(tiles('./hex_blank.png')));
    this.textures.set(Terrain.GRASS, PIXI.Texture.from(tiles('./hex_grassland.png')));
    this.textures.set(Terrain.HILLS, PIXI.Texture.from(tiles('./hex_hills.png')));
    this.textures.set(Terrain.MOUNTAIN, PIXI.Texture.from(tiles('./hex_mountain.png')));
    this.textures.set(Terrain.SEA, PIXI.Texture.from(tiles('./hex_sea.png')));
    this.textures.set(Terrain.FOREST, PIXI.Texture.from(tiles('./hex_forest.png')));
    this.textures.set(Terrain.CITY, PIXI.Texture.from(tiles('./hex_arctic.png')));

    const bottomHex = this.map[this.map.length - 1].toPoint();
    const viewport = new Viewport({
      screenWidth: app.renderer.screen.width,
      screenHeight: app.renderer.screen.height,
      worldWidth: bottomHex.x + HEX_WIDTH,
      worldHeight: bottomHex.y + HEX_HEIGHT,
      interaction: app.renderer.plugins.interaction,
    });
    // add the viewport to the stage
    app.stage.addChild(viewport);
    // activate plugins
    viewport
      .drag()
      .pinch()
      .clamp({ direction: 'all' })
      .on('clicked', (data) => this.click(data.world.x, data.world.y));

    this.map.forEach((hex: any) => {
      const sprite = new PIXI.Sprite(this.textures.get(hex.terrain));
      const p = hex.toPoint();
      sprite.x = p.x;
      sprite.y = p.y;
      viewport.addChild(sprite);
    });

    const p = playerHex.toPoint();
    viewport.moveCenter(new PIXI.Point(p.x, p.y));
  }

  click(x: number, y: number): void {
    const hex: Hex<any> | undefined = this.map.get(toHex(x, y).coordinates());
    console.log('Select %s from [%s, %s]', hex, x, y);
    if (hex) {
      bus.$emit('select-tile', hex);
      console.log('Select %s at [%s, %s]', TileMap.getTerrainName(hex.terrain), hex.coordinates().x, hex.coordinates().y);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  static getTerrainName(terrain: Terrain): string {
    switch (terrain) {
      case Terrain.GRASS: return 'Grass';
      case Terrain.HILLS: return 'Hills';
      case Terrain.MOUNTAIN: return 'Mountain';
      case Terrain.SEA: return 'Sea';
      case Terrain.FOREST: return 'Forest';
      case Terrain.CITY: return 'City';
      case Terrain.UNKNOWN: return 'Unknown';
      default: return 'Unknown';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
