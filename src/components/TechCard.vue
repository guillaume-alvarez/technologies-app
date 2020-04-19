<template>
  <div class="tech">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ tech.name }}
        </p>
      </header>
      <div class="card-content">
        <div class="content tech-text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Technology } from '../technology';

@Component
export default class TechCard extends Vue {
  @Prop() private tech!: Technology;

  get text(): string {
    return this.tech.text;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 200px;
  background-image: url("../assets/parch-texture.png");
}

.tech-text {
  white-space: pre-line;
  text-align: left;
}
</style>
