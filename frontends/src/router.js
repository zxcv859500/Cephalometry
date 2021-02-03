import Vue from 'vue';
import Router from 'vue-router';
import Page from './components/Output';
import Login from './components/Login';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            components: { default: Page },
        },
        {
            path: '/login',
            name: 'Login',
            components: { default: Login }
        }
    ]
})