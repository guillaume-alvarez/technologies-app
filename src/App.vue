<template>
  <div id="app">
      <Board/>
  </div>
</template>

<script lang="ts">
import 'bulma/css/bulma.css';

import { Component, Vue } from 'vue-property-decorator';
import Board from './components/Board.vue';

@Component({
  components: {
    Board,
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: small;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*overflow-x: scroll;*/
  /* set here, if set in Era.vue it would show divisions between sections */
  background-image: url("./assets/big-marble-texture.png");
}
</style>
