<template>
  <div class="era">
    <section class="section">
      <h1 class="title">{{ name }}</h1>
      <div class="columns is-multiline">
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
export default class Era extends Vue {
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

</style>
