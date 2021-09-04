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
            likeIt:true,
            commentSuccess:false,
            errors:[],
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
            },
            viewsIncrement(context,payload) {
                setTimeout( () => {
                axios.put('/api/article-views-increment',{slug:payload})
                    .then((response)=>{
                    context.commit("SET_ARTICLE",response.data.data)
                    }).catch(() =>
                {
                    console.log('error')
                });
                    },2000)
             // далее вызываем в created в файле app.js
        },

        addLike(context, payload){
            axios.put('/api/article-likes-increment', {slug:payload.slug, increment:payload.increment }).then((response) =>{
                context.commit('SET_ARTICLE', response.data.data)
                context.commit('SET_LIKE', !context.state.likeIt)
            }).catch(()=>{
                console.log('Ошибка addLike')
            });
            console.log("После клика по кнопке", context.state.likeIt)
        },
        addComment(context, payload){
            axios.post('/api/article-add-comment', { subject:payload.subject, body:payload.body, article_id:payload.article_id}).then((response) =>{
                context.commit('SET_COMMENT_SUCCESS', !context.state.commentSuccess)
                context.dispatch('getArticleData', context.state.slug) // получает данные и сразу отображает новый комментарий
            }).catch((error)=>{
                //если есть ошибка
                if(error.response.status === 422) {
                    context.state.errors = error.response.data.errors; //заполняем массив с ошибками( и выводим в comments-component)
                }

            });
        },
    },
        getters:{ // используется для вычисляемых свойств

            articleViews(state) {

                    return state.article.statistic.views;

            },
            articleLikes(state) {

                    return state.article.statistic.likes;

            }
        },
        mutations:{ //аналог setters, здесь хранятся новые значения переменных
            //если есть переменная, должна быть мутация
            SET_ARTICLE(state,payload) {
                return state.article = payload;
            },
            SET_SLUG(state,payload) {
                return state.slug = payload;
            },
            SET_LIKE(state,payload){
                return state.likeIt = payload;
            },
            SET_COMMENT_SUCCESS(state,payload){
                return state.commentSuccess = payload;
            }
        }
    }
)
