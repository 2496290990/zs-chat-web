import Vue from 'vue'
import Router from 'vue-router';
// import Login from "../pages/login/index.vue";

import Login from "../pages/login/login.vue";
import Register from "../pages/login/register.vue";
import Contact from '../pages/chat/index.vue';
import CircleFriends from "../pages/login/circleFriends.vue";
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
         {
            path: '/circleFriends',
            name: 'circleFriends',
            component: CircleFriends
        },
        {
            path: '/contact/:id',
            name: 'contact',
            component: Contact
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/group/:id',
            name: 'group',
            component: Contact
        },
        {
            path: '/group',
            name: 'group',
            component: Contact
        },
        {
            path: '/chatroom/:id',
            name: 'chatroom',
            component: Contact
        },
        {
            path: '/chatroom',
            name: 'chatroom',
            component: Contact
        },
    ]
})
