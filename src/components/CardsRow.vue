<template>
  <div class="cards-row">
    <div class="columns is-multiline">
      <h1 class="column is-narrow title is-uppercase">
        {{ name }}
      </h1>
      <TechCard v-for="card in cards" :key="card.id"
        :id="card.id" :card="card" :highlight="highlight(card)">
      </TechCard>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TechCard from './TechCard.vue';
import { Technology, Card } from '../model/technology';

@Component({
  components: {
    TechCard,
  },
})
export default class CardsRow extends Vue {
  @Prop() private name!: string;

  @Prop() private cards!: Array<Card>;

  @Prop() private highlightedCards!: Array<Card>;

  highlight(card: Card): boolean {
    return this.highlightedCards.includes(card);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.cards-row {
  border-bottom: thin outset black;
  padding: 1em;
}
</style>
