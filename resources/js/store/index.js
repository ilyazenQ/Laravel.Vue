import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state:{ //хранилище состояний,хранятся все переменные

            article:{ // структура обьекта
                comments:[],
                tags:[],
                statistic:{
                    likes:0,
                    views:0,
                }

            },
            slug:'',
        },
        actions:{ // для выполнения асинхронных запросов к серверу
            getArticleData(context,payload) {
                axios.get('/api/article-json',{params:{slug:payload}}) // делаем get запрос к роуту
                    .then(
                        (response) =>{ //Результат
                            // ArticleControleer@show
                            context.commit('SET_ARTICLE',response.data.data);
                            //вызывается мутация, заполняется переменная article
                        }).catch(() =>{
                            console.log('error');
                    }
                    );
            }

        },
        getters:{ // используется для вычисляемых свойств

            articleViews(state) {
                if(state.article.statistic) {
                    return state.article.statistic.views;
                }
            },
            articleLikes(state) {
                if(state.article.statistic) {
                    return state.article.statistic.likes;
                }
            }
        },
        mutations:{ //аналог setters, здесь хранятся новые значения переменных
            //если есть переменная, должна быть мутация
            SET_ARTICLE(state,payload) {
                return state.article = payload;
            },
            SET_SLUG(state,payload) {
                return state.slug = payload;
            }
        }
    }
)
