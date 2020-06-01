<template>
  <div class="summary">
    <div class="columns">
      <div class="column" v-for="(gain, name) in gain" :key="name">
        <EffectIcon :type="name" :value="current[name] + '+' + gain"
          :tooltip="'Gain +' + gain + ' ' + name + ' when selecting a new card.'"/>
      </div>
    </div>
    <div class="columns">
      <div class="column" v-for="[terrain, nb] of settledTerrains" :key="terrain">
        <EffectIcon :type="terrain" :value="nb"
          :tooltip="'Settled ' + nb + ' ' + terrain + ' tile(s)'"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line max-classes-per-file
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import EffectIcon from './EffectIcon.vue';
import { Card, Effects, EFFECTS_NAMES } from '../model/technology';
import { Terrain, Tile } from '../model/map';
import { state } from '../model/store';

@Component({
  components: {
    EffectIcon,
  },
})
export default class Summary extends Vue {
  private settledTerrains = Summary.getSettledTerrainsArray();

  private gain = state.gain;

  private current = state.current;

  created() {
    bus.$on('settle-tile', (hex: Tile) => {
      // re-compute the settled tiles as an array, monitored by vue
      this.settledTerrains = Summary.getSettledTerrainsArray();
    });
  }

  static getSettledTerrainsArray() {
    const arr = new Array<[string, number]>();
    state.settledTerrains.forEach((nb, terrain) => {
      arr.push([terrain, nb]);
    });
    return arr;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.summary {
  padding: 1em;
  max-width: 100em;
}
</style>
