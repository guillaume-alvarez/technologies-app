<template>
  <div id="board">
    <MessageBanner title="TECHNOLOGIES" :message="message"/>
    <CardsRow name="Future" :cards="futureCards" :highlightedCards="highlightedCards"/>
    <div class="columns">
      <div class="column is-narrow">
        <Summary :cards="presentCards"/>
        <TileMap/>
      </div>
      <div class="column">
        <CardsRow name="Present" :cards="presentCards" :highlightedCards="highlightedCards"/>
        <CardsRow name="Past" :cards="pastCards" :highlightedCards="highlightedCards"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import CardsRow from './CardsRow.vue';
import Summary from './Summary.vue';
import TileMap from './TileMap.vue';
import MessageBanner from './MessageBanner.vue';
import {
  Technology, Card, Effects,
  Innovation,
} from '../model/technology';
import { state } from '../model/store';


@Component({
  components: {
    CardsRow,
    Summary,
    TileMap,
    MessageBanner,
  },
})
export default class Board extends Vue {
  private highlightedCards = new Array<Card>();

  private pastCards = new Array<Card>();

  private presentCards = new Array<Card>();

  private futureCards = new Array<Card>();

  private message = 'Pick a technology you can pay for, or explore the map...';

  created() {
    bus.$on('change-cards', () => {
      this.recomputeCards();
    });
    bus.$on('hover-card', (...args: any[]) => {
      const [tech, hover] = args;
      this.onHoverTech(tech, hover);
    });
    this.recomputeCards();
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

  static compareEffect(name: keyof Effects, a: Card, b: Card): number {
    return Board.compareNumber(a.effects[name], b.effects[name]);
  }

  // food > prod > social > tech > strength
  static compareTech(a: Card, b: Card): number {
    let c = Board.compareEffect('food', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('prod', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('social', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('science', a, b);
    if (c !== 0) return c;

    c = Board.compareEffect('strength', a, b);
    if (c !== 0) return c;

    return a.name.localeCompare(b.name);
  }

  recomputeCards(): void {
    this.presentCards = Array.from(state.presentCards.values())
      .sort(Board.compareTech)
      .reverse();
    this.pastCards = Array.from(state.pastCards.values())
      .sort(Board.compareTech)
      .reverse();

    // do not re-order them: keep the logical order they came in
    this.futureCards = Array.from(state.futureCards);
  }

  /** Highlight selected tech + previous + next */
  onHoverTech(tech: Technology, hover: boolean): void {
    if (hover) {
      if (tech instanceof Technology) {
        this.highlightedCards = [
          tech,
          ...tech.previous,
          ...tech.innovations,
          ...this.futureCards.filter((t) => (t instanceof Technology && t.previous.includes(tech))),
        ];
      }
      if (tech instanceof Innovation) {
        this.highlightedCards = [
          tech,
          ...this.futureCards
            .filter((t) => (t instanceof Technology && t.innovations.includes(tech))),
          ...this.presentCards
            .filter((t) => (t instanceof Technology && t.innovations.includes(tech))),
          ...this.pastCards
            .filter((t) => (t instanceof Technology && t.innovations.includes(tech))),
        ];
      }
    } else {
      this.highlightedCards = [];
    }
  }
}
</script>

<style scoped>
</style>
