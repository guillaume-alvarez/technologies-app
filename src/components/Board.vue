<template>
  <div id="board">
      <Summary name="Future" :techs="playerTechs"/>
      <Era name="Future" :techs="futureTechs" :highlightedTechs="highlightedTechs"/>
      <Era name="Present" :techs="presentTechs" :highlightedTechs="highlightedTechs"/>
      <Era name="Past" :techs="pastTechs" :highlightedTechs="highlightedTechs"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import Era from './Era.vue';
import Summary from './Summary.vue';
import {
  Technology,
  Effects,
  technologies,
  includesPrevious,
} from '../model/technology';

@Component({
  components: {
    Era,
    Summary,
  },
})
export default class Board extends Vue {
  private highlightedTechs = new Array<Technology>();

  private pastTechs = new Array<Technology>();

  private presentTechs: Array<Technology>
   = technologies.filter((tech) => tech.root).sort(Board.compareTech).reverse();

  get playerTechs(): Array<Technology> {
    return [...this.presentTechs, ...this.pastTechs];
  }

  get futureTechs(): Array<Technology> {
    return technologies
      // tech not already discovered
      .filter((tech) => !this.pastTechs.includes(tech))
      .filter((tech) => !this.presentTechs.includes(tech))
      // tech can be discovered
      // eslint-disable-next-line max-len
      .filter((tech) => includesPrevious(tech, this.pastTechs) || includesPrevious(tech, this.presentTechs))
      // and sorted
      .sort(Board.compareTech)
      .reverse();
  }

  created() {
    bus.$on('select-tech', (tech: Technology) => {
      this.onSelectTech(tech);
    });
    bus.$on('hover-tech', (...args: any[]) => {
      const [tech, hover] = args;
      this.onHoverTech(tech, hover);
    });
  }

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
    return Board.compareNumber(a.effects[name], b.effects[name]);
  }

  // food > prod > social > tech > strength
  static compareTech(a: Technology, b: Technology): number {
    let c = Board.compareEffect('food', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('prod', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('social', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('tech', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('strength', a, b);
    if (c !== 0) return c;

    return a.name.localeCompare(b.name);
  }

  private addPresentTech(tech: Technology): void {
    this.presentTechs.push(tech);
    this.presentTechs.sort(Board.compareTech).reverse();
    // also push previous to past
    tech.previous.forEach((previous) => {
      if (Board.removeTech(this.presentTechs, previous)) {
        this.addPastTech(previous);
      }
    });
  }

  private addPastTech(tech: Technology): void {
    this.pastTechs.push(tech);
    this.pastTechs.sort(Board.compareTech).reverse();
  }

  onSelectTech(tech: Technology): void {
    if (Board.removeTech(this.futureTechs, tech)) {
      this.addPresentTech(tech);
    } else if (Board.removeTech(this.presentTechs, tech)) {
      this.addPastTech(tech);
    }
  }

  /** Highlight selected tech + previous + next */
  onHoverTech(tech: Technology, hover: boolean): void {
    if (hover) {
      this.highlightedTechs = [
        tech,
        ...tech.previous,
        ...this.futureTechs.filter((t) => t.previous.includes(tech)),
      ];
    } else {
      this.highlightedTechs = [];
    }
  }
}
</script>

<style scoped>
</style>
