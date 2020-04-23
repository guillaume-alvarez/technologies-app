<template>
  <div class="summary level">
    <div class="level-item" v-for="tmp of effects" :key="tmp.name">
      <EffectIcon :name="tmp.name" :value="'+' + tmp.value" :tooltip="tmp.sources.join('\n')"/>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line max-classes-per-file
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import EffectIcon from './EffectIcon.vue';
import { Technology, Effects, EFFECTS_NAMES } from '../model/technology';

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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.summary {
  padding: 1em;
}
</style>
