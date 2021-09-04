require('./bootstrap');

window.Vue = require('vue').default;

import store from './store';
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('article-component', require('./components/ArticleComponent.vue').default);
Vue.component('views-component', require('./components/ViewsComponent.vue').default);
Vue.component('likes-component', require('./components/LikesComponent.vue').default);
Vue.component('comments-component', require('./components/CommentComponent.vue').default);



const app = new Vue({
    store,
    el: '#app',
    created(){//после создания vue
        let url = window.location.pathname;
        let slug = url.substring(url.lastIndexOf('/')+1);

        this.$store.commit('SET_SLUG',slug);
        this.$store.dispatch('getArticleData',slug);
        //dispatch - вызываем action из index
        this.$store.dispatch('viewsIncrement',slug);
    }
});
