import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
        state: {
            token: ""
        },
        getters: {
            getToken(state) {
                state.token = localStorage.getItem('token');
                return state.token;
            }
        },
        mutations: {
            setToken(state, payload) {
                localStorage.setItem('token', payload.token);
                state.token = payload.token;
            }
        }
    }
);

export default store;