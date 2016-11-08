import Vue from 'vue';
import Router from 'vue-router';
import Tools from '../components/Tools/index.vue';
import Home from '../components/Home/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/tools', component: Tools },
    { path: '/', component: Home },
    { path: '*', redirect: '/' },
  ],
});
