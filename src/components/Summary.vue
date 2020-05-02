<template>
  <div class="summary columns">
    <div class="column" v-for="tmp of effects" :key="tmp.name">
      <EffectIcon :type="tmp.name" :value="'+' + tmp.value"
        :tooltip="'Gain +' + tmp.value + ' ' + tmp.name + ':\n' + tmp.sources.join('\n')"/>
    </div>
    <div class="column" v-for="terrain of terrains" :key="terrain[0]">
      <EffectIcon :type="terrain[0]" :value="terrain[1]"
        :tooltip="'Settled ' + terrain[1] + ' ' + terrain[0] + ' tile(s)'"/>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line max-classes-per-file
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import EffectIcon from './EffectIcon.vue';
import { Technology, Effects, EFFECTS_NAMES } from '../model/technology';
import { Terrain, grid } from '../model/map';

class TmpEffect {
  name!: keyof Effects;

  value = 0;

  sources = new Array<string>();

  constructor(name: keyof Effects) {
    this.name = name;
  }

  append(tech: Technology) {
    const value = tech.effects[this.name];
    if (value) { // filter out 0 or undefined
      this.value += value;
      this.sources.push(`+${value} from ${tech.name}`);
    }
  }
}

@Component({
  components: {
    EffectIcon,
  },
})
export default class Summary extends Vue {
  @Prop() private techs!: Array<Technology>;

  get effects() {
    const effects = new Map<keyof Effects, TmpEffect>();
    EFFECTS_NAMES.forEach((name) => {
      effects.set(name, new TmpEffect(name));
    });
    this.techs.forEach((tech) => {
      EFFECTS_NAMES.forEach((name) => {
        effects.get(name)!.append(tech);
      });
    });
    return Array.from(effects.values());
  }

  // eslint-disable-next-line class-methods-use-this
  get terrains() {
    const terrains = new Map<Terrain, number>();
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(Terrain).forEach((k) => {
      const terrain = Terrain[k as keyof typeof Terrain];
      if (terrain !== Terrain.UNKNOWN) {
        terrains.set(terrain, 0);
      }
    });
    // now compute number of tiles
    grid.filter((hex) => hex.settled).forEach((hex) => {
      let nb = terrains.get(hex.terrain) || 0;
      nb += 1;
      terrains.set(hex.terrain, nb);
    });
    return terrains;
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
