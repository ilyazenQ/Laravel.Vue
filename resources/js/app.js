require('./bootstrap');

window.Vue = require('vue').default;

import store from './store';
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('article-component', require('./components/ArticleComponent.vue').default);


const app = new Vue({
    store,
    el: '#app',

});
