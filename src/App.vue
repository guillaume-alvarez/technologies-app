<template>
  <div id="app">
      <Era name="Future" :techs="futureTechs" @select-tech="onSelectTech"/>
      <Era name="Present" :techs="presentTechs" @select-tech="onSelectTech"/>
      <Era name="Past" :techs="pastTechs" @select-tech="onSelectTech"/>
  </div>
</template>

<script lang="ts">
import 'bulma/css/bulma.css';

import { Component, Vue } from 'vue-property-decorator';
import Era from './components/Era.vue';
import { technologies, Technology, Effects } from './technology';

@Component({
  components: {
    Era,
  },
})
export default class App extends Vue {
  private pastTechs: Array<Technology> = [];

  private presentTechs: Array<Technology>
   = technologies.filter((tech) => tech.rank === 0).sort(App.compareTech).reverse();

  private futureTechs: Array<Technology>
   = technologies.filter((tech) => tech.rank > 0).sort(App.compareTech).reverse();

  static removeTech(array: Array<Technology>, tech: Technology): boolean {
    const idx = array.indexOf(tech);
    if (idx >= 0) {
      array.splice(idx, 1);
      return true;
    }
    return false;
  }

  static compareNumber(a?: number, b?: number): number {
    if (a) {
      if (b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }
      return 1;
    }
    if (b) {
      return -1;
    }
    // both undefined
    return 0;
  }

  static compareEffect(name: keyof Effects, a: Technology, b: Technology): number {
    return App.compareNumber(a.effects[name], b.effects[name]);
  }

  // food > prod > social > tech > strength
  static compareTech(a: Technology, b: Technology): number {
    let c = App.compareEffect('food', a, b);
    if (c !== 0) return c;

    c = App.compareEffect('prod', a, b);
    if (c !== 0) return c;

    c = App.compareEffect('social', a, b);
    if (c !== 0) return c;

    c = App.compareEffect('tech', a, b);
    if (c !== 0) return c;

    c = App.compareEffect('strength', a, b);
    if (c !== 0) return c;

    return a.name.localeCompare(b.name);
  }

  onSelectTech(tech: Technology): void {
    if (App.removeTech(this.futureTechs, tech)) {
      this.presentTechs.push(tech);
      this.presentTechs.sort(App.compareTech).reverse();
      console.log('Move %s to present techs', tech.name);
    } else if (App.removeTech(this.presentTechs, tech)) {
      this.pastTechs.push(tech);
      this.pastTechs.sort(App.compareTech).reverse();
      console.log('Move %s to past techs', tech.name);
    } else {
      console.log('Cannot remove past tech %s', tech.name);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow-x: scroll;

  /* set here, if set in Era.vue it would show divisions between sections */
  background-image: url("assets/big-marble-texture.png");
}
</style>
