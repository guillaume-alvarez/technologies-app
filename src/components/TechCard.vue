<template>
  <CardMove :duration="500">
    <div class="tech column is-narrow" @click="$emit('select-tech', tech)">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ tech.name }}
          </p>
          <div class="card-header-icon">
            <span class="era" :title="tech.era.name">{{ tech.era.roman }}</span>
            <span v-for="(value, name) in tech.effects" :key="name">
              <figure class="image is-32x32 effect">
                <img :src="getIconPath(name)" :title="'+' + value + ' ' + name">
                <p class="effect-value">+{{value }}</p>
              </figure>
            </span>
          </div>
        </header>
        <div class="card-content">
          <div class="content tech-text">
            {{ text }}
          </div>
        </div>
      </div>
    </div>
  </CardMove>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardMove from './CardMove.vue';
import { Technology, Effects } from '../model/technology';

@Component({
  components: {
    CardMove,
  },
})
export default class TechCard extends Vue {
  @Prop() private tech!: Technology;

  get text(): string {
    return this.tech.text;
  }

  get id(): string {
    return this.tech.id;
  }

  getIconPath = function getIconPath(effect: keyof Effects): string {
    const icons = require.context('../assets/icons/', false, /\.svg$/);
    switch (effect) {
      case 'prod': return icons('./tools.svg');
      case 'strength': return icons('./swords.svg');
      case 'food': return icons('./wheat.svg');
      case 'social': return icons('./village.svg');
      case 'tech': return icons('./enlightenment.svg');
      default: return '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  min-width: 10em;
  background-image: url("../assets/parch-texture.png");

  /* strong shadow */
  box-shadow: 1em 1em 2em -0.125em rgba(10, 10, 10, 0.5), 0 0px 0 1px rgba(10, 10, 10, 0.02);

  border-radius: 0.5em; /* slightly round corner, like physical cards */
  border: thin outset black;
}

.card-header-title {
  padding: 0.5em;
}
.card-content {
  padding: 0.5em;
}
.card-header-icon {
  padding: 0.5em;
}

.era {
  /* separate from icons */
  padding: 0.3em;
  border-radius: 0.5em; /* slightly round corner */
  border: thin outset black;
  /* make it readable over any image */
  font-weight: bold;
  font-size: larger;
  color: black;
}

.effect-value {
  /* position on the image */
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 0.7; /* do not keep space below the line */
  /* make it readable over any image */
  font-weight: bold;
  font-size: larger;
  color: black;
}

.tech-text {
  white-space: pre-line; /* keep formatting from json */
  text-align: left;
}
</style>
