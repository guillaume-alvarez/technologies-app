import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

/**
 * Event bus used to subscribe to events from all components.
 */
export const bus = new Vue();
export { bus as default };

new Vue({
  render: (h) => h(App),
}).$mount('#app');
