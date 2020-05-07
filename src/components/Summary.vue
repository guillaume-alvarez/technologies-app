<template>
  <div class="summary">
    <div class="columns">
      <div class="column" v-for="tmp of effects" :key="tmp.name">
        <EffectIcon :type="tmp.name" :value="'+' + tmp.value"
          :tooltip="'Gain +' + tmp.value + ' ' + tmp.name + ':\n' + tmp.sources.join('\n')"/>
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

class TmpEffect {
  name!: keyof Effects;

  value = 0;

  sources = new Array<string>();

  constructor(name: keyof Effects) {
    this.name = name;
  }

  append(card: Card) {
    const value = card.effects[this.name];
    if (value) { // filter out 0 or undefined
      this.value += value;
      this.sources.push(`+${value} from ${card.name}`);
    }
  }
}

@Component({
  components: {
    EffectIcon,
  },
})
export default class Summary extends Vue {
  @Prop() private cards!: Array<Card>;

  private settledTerrains = Summary.getSettledTerrainsArray();

  created() {
    bus.$on('settle-tile', (hex: Tile) => {
      // re-compute the settled tiles as an array, monitored by vue
      this.settledTerrains = Summary.getSettledTerrainsArray();
    });
  }

  get effects() {
    const effects = new Map<keyof Effects, TmpEffect>();
    EFFECTS_NAMES.forEach((name) => {
      effects.set(name, new TmpEffect(name));
    });
    this.cards.forEach((card) => {
      EFFECTS_NAMES.forEach((name) => {
        effects.get(name)!.append(card);
      });
    });
    return Array.from(effects.values());
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
