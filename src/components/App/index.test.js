
import Vue from 'vue';
import App from './index.vue';

describe('test', () => {
  it('Test example', () => {
    const vm = new Vue({
      template: '<div><app></app></div>',
      components: { App }
    }).$mount()
     expect(vm.$el.querySelector('.doesthisrun?')).toBeTruthy()
    // const Ctor = Vue.extend(App)
    // const vm = new Ctor().$mount()
    // expect(vm.$el.textContent).toBe('bye!')
  });
});
