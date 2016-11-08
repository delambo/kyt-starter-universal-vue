import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './components/App/index.vue';
import store from './store';
import router from './router';
import * as filters from './filters';

// Sync the router with the vuex store.
// This registers `store.state.route`
sync(store, router);

// Register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// Create the app instance.
// Here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  store,
  ...App, // Object spread copying everything from App.vue
});

// Expose the app, the router and the store.
// Note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in browser or on the server.
export { app, router, store };
