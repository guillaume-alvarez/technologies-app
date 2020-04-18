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
import { technologies, Technology } from './technology';

@Component({
  components: {
    Era,
  },
})
export default class App extends Vue {
  private pastTechs: Array<Technology> = [];

  private presentTechs: Array<Technology> = technologies.filter((tech) => tech.rank === 0);

  private futureTechs: Array<Technology> = technologies.filter((tech) => tech.rank > 0);

  static removeTech(array: Array<Technology>, tech: Technology): boolean {
    const idx = array.indexOf(tech);
    if (idx >= 0) {
      array.splice(idx, 1);
      return true;
    }
    return false;
  }

  onSelectTech(tech: Technology): void {
    if (App.removeTech(this.futureTechs, tech)) {
      this.presentTechs.push(tech);
      console.log('Move %s to present techs', tech.name);
    } else if (App.removeTech(this.presentTechs, tech)) {
      this.pastTechs.push(tech);
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
}
</style>
