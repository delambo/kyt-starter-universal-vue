import './polyfill';
import { app, store } from '../app';

// Prime the store with server-initialized state.
// The state is determined during SSR and inlined in the page markup.
store.replaceState(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

app.$mount('#app');
