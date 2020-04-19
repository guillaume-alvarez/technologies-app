<template>
  <div class="era">
    <section class="section">
        <h1 class="title">{{ name }}</h1>
        <div class="columns is-multiline">
          <div class="column is-narrow" v-for="tech in techs" v-bind:key="tech.id">
            <div @click="$emit('select-tech', tech)">
              <TechCard :tech="tech"/>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TechCard from './TechCard.vue';
import { Technology } from '../technology';

@Component({
  components: {
    TechCard,
  },
})
export default class Era extends Vue {
  @Prop() private name!: string;

  @Prop() private techs!: Array<Technology>;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.era {
  background-image: url("../assets/big-marble-texture.png");
}

</style>
