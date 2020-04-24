<template>
  <div class="cards-row">
    <section class="section">
      <div class="columns is-multiline">
        <h1 class="column is-narrow title is-uppercase">
          {{ name }}
        </h1>
        <TechCard v-for="tech in techs" :key="tech.id"
          :id="tech.id" :tech="tech" :highlight="highlight(tech)">
        </TechCard>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TechCard from './TechCard.vue';
import { Technology } from '../model/technology';

@Component({
  components: {
    TechCard,
  },
})
export default class CardsRow extends Vue {
  @Prop() private name!: string;

  @Prop() private techs!: Array<Technology>;

  @Prop() private highlightedTechs!: Array<Technology>;

  highlight(tech: Technology): boolean {
    return this.highlightedTechs.includes(tech);
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
  border: thin outset black;
  border-style: solid none;
}
</style>
