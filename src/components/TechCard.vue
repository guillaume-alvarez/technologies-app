<template>
  <CardMove :duration="500">
    <div class="tech-card column is-narrow" @click="onClick()">
      <div class="card"
        :class="highlight ? 'highlight' : ''"
        @mouseover="onMouseOver()"
        @mouseleave="onMouseLeave()">
        <header class="card-header">
          <p class="card-header-title">
            {{ card.name }}
          </p>
          <div class="card-header-icon">
            <span class="era" :title="card.era.name">{{ card.era.roman }}</span>
            <EffectIcon v-for="(value, name) in card.effects" :key="name"
              :type="name" :value="'+' + value" :tooltip="'+' + value + ' ' + name"
            />
          </div>
        </header>
        <div class="card-content">
          <div class="content tech-text">
            {{ text }}
          </div>
        </div>
        <ul class="card-footer">
          <li v-for="previous in card.previous" :key="previous.id"
            class="card-footer-item card-header-title">
            =>{{ previous.name }}
          </li>
          <li key="cost" class="card-footer-item">
            Cost
            <EffectIcon type="science"
              :value="'-' + card.cost"
              :tooltip="'Costs ' + card.cost + ' science'"/>
          </li>
        </ul>
      </div>
    </div>
  </CardMove>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bus } from '../main';
import CardMove from './CardMove.vue';
import EffectIcon from './EffectIcon.vue';
import { Technology, Card, Innovation } from '../model/technology';
import { state } from '../model/store';

@Component({
  components: {
    CardMove,
    EffectIcon,
  },
})
export default class TechCard extends Vue {
  @Prop() private card!: Card;

  @Prop() private highlight!: boolean;

  get text(): string {
    if (this.card instanceof Technology) {
      return ['Potential innovations:', ...this.card.innovations.map((i) => i.name)].join('\n- ');
    }
    if (this.card instanceof Innovation) {
      return 'Innovation...';
    }
    return '';
  }

  get id(): string {
    return this.card.id;
  }

  onClick() {
    state.selectCard(this.card);
  }

  onMouseOver() {
    bus.$emit('hover-card', this.card, true);
  }

  onMouseLeave() {
    bus.$emit('hover-card', this.card, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  min-width: 10em;
  background-image: url("../assets/parch-texture.png");
  font-size: smaller;
  cursor: grab;

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

.highlight:before {
  transform: scale(1.2);
  box-shadow: 0 0 1em yellow inset, 0 0 1em yellow;
  filter: blur(1em);
}

.highlight {
  box-shadow: 0 0 1em yellow inset, 0 0 1em yellow;
}

.card-footer-item {
  /** minimal padding for readability */
  padding: 0.1em;
}
</style>
