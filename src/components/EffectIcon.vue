<template>
  <figure class="image is-32x32 effect" :title="tooltip">
    <img :src="getIconPath" height="32" width="32">
    <p class="effect-value">{{ value }}</p>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Effects } from '../model/technology';
import { Terrain } from '../model/map';

@Component
export default class EffectIcon extends Vue {
  @Prop() private type!: keyof Effects | Terrain;

  @Prop() private value!: string;

  @Prop() private tooltip!: string;

  get getIconPath(): string {
    const tiles = require.context('../assets/tiles/', false, /\.png$/);
    const icons = require.context('../assets/icons/', false, /\.svg$/);
    switch (this.type) {
      case Terrain.UNKNOWN: return tiles('./hex_blank.png');
      case Terrain.DESERT: return tiles('./hex_desert.png');
      case Terrain.GRASS: return tiles('./hex_grassland.png');
      case Terrain.HILLS: return tiles('./hex_hills.png');
      case Terrain.MOUNTAIN: return tiles('./hex_mountain.png');
      case Terrain.SEA: return tiles('./hex_sea.png');
      case Terrain.FOREST: return tiles('./hex_forest.png');
      case Terrain.CITY: return tiles('./hex_arctic.png');
      case 'prod': return icons('./tools.svg');
      case 'strength': return icons('./swords.svg');
      case 'food': return icons('./wheat.svg');
      case 'social': return icons('./village.svg');
      case 'science': return icons('./enlightenment.svg');
      default: return '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.effect-value {
  /* position on the image */
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 0.7; /* do not keep space below the line */
  /* make it readable over any image */
  font-weight: bold;
  font-size: larger;
  color: black;
}
</style>
