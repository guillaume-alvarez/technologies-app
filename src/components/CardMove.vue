<template>
  <transition name="card-move"
    v-on:before-leave="beforeLeave"
    v-bind:css="false">
    <slot/>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardMove extends Vue {
  private static previousPositions = new Map<string, DOMRect>();

  private intervalIndex?: number;

  @Prop() private duration!: number;

  public mounted(): void {
    const previous = CardMove.previousPositions.get(this.$el.id);
    if (previous) {
      this.move(previous, this.$el.getBoundingClientRect());
    } else {
      this.startPositionInspection();
    }
  }

  private startPositionInspection(): void {
    const p = this.$el.getBoundingClientRect();
    this.intervalIndex = setInterval(() => {
      const current = this.$el.getBoundingClientRect();
      if (current.x === p.x && current.y === p.y) return;
      this.move(p, current);
    }, 10);
  }

  private move(from: DOMRect, to: DOMRect) {
    clearInterval(this.intervalIndex);
    this.$el.animate([
      { transform: `translate(${from.x - to.x}px, ${from.y - to.y}px)` },
      { transform: 'translate(0, 0)' },
    ], {
      duration: this.duration,
      easing: 'cubic-bezier(0,0,0.32,1)',
    }).addEventListener('finish', () => this.startPositionInspection());
  }

  // eslint-disable-next-line class-methods-use-this
  public beforeLeave(el: HTMLElement) {
    CardMove.previousPositions.set(el.id, el.getBoundingClientRect());
  }
}
</script>

<style scoped>
</style>
