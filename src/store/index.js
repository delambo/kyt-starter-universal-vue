import Vue from 'vue';
import Vuex from 'vuex';

// Setup the store.
// https://vuex.vuejs.org/en/intro.html
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tools: [],
  },

  actions: {
    // A contrived example that asynchronously fetching tools.
    FETCH_TOOLS: ({ commit }) => {
      const asyncAction = new Promise((resolve) => {
        setTimeout(() => {
          resolve([{
            name: 'Express',
            description: 'server-side rendering',
            link: 'https://expressjs.com/',
          }, {
            name: 'Vue',
            description: 'JavaScript framework which includes components, state management, routing and more',
            link: 'https://vuejs.org/',
          }, {
            name: 'Vuex',
            description: 'State management pattern and library for Vue.js applications',
            link: 'https://vuex.vuejs.org/en/index.html'
          }, {
            name: 'Vue Loader',
            description: 'Write Vue component files with the <template>, <script>, and <style> all inline.',
            link: 'http://vue-loader.vuejs.org/en/index.html'
          }]);
        }, 40);
      });

      return asyncAction.then(tools => commit('SET_TOOLS', tools));
    },
  },

  mutations: {
    SET_TOOLS: (state, tools) => {
      state.tools = tools;
    },
  },

  getters: {},
});

export default store;
