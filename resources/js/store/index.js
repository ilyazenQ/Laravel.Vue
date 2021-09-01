import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state:{ //хранилище состояний,хранятся все переменные
            firstname:'Jon',
            lastname:'Jayson'

        },
        actions:{ // для выполнения асинхронных запросов к серверу
            testAction(context,payload) {
                context.commit("SET_FIRSNAME",response.data.name)
                context.commit("SET_LASTNAME",response.data.lastnaem)
            }

        },
        getters:{ // используется для вычисляемых свойств
            getFullName(state) {
                return state.firstname +" "+ state.lastname
            }
        },
        mutations:{ //аналог setters, здесь хранятся новые значения переменных
            SET_FIRSTNAME(state,payload){
                state.firstname = payload
            },
            SET_LASTNAME(state,payload) {
                state.lastname = payload;
            }
        }
    }
)
