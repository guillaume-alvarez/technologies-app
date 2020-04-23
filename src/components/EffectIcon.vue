<template>
  <figure class="image is-32x32 effect">
    <img :src="getIconPath" :title="tooltip">
    <p class="effect-value">{{ value }}</p>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Effects } from '../model/technology';

@Component
export default class EffectIcon extends Vue {
  @Prop() private name!: keyof Effects;

  @Prop() private value!: string;

  @Prop() private tooltip!: string;

  get getIconPath(): string {
    const icons = require.context('../assets/icons/', false, /\.svg$/);
    switch (this.name) {
      case 'prod': return icons('./tools.svg');
      case 'strength': return icons('./swords.svg');
      case 'food': return icons('./wheat.svg');
      case 'social': return icons('./village.svg');
      case 'tech': return icons('./enlightenment.svg');
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
