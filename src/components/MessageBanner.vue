<template>
  <div class="message-banner">
    <div class="navbar">
      <div class="navbar-brand">
        <h1 class="title">{{ title }}</h1>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <p class="navbar-item" style="font-size: larger">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessageBanner extends Vue {
  @Prop() private title!: string;

  @Prop() private message!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
