import Vue from "vue";
import App from "@/App.vue";
// import Router from 'vue-router'
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Personal from "@/pages/Personal";

import Vant from 'vant';
import axios from 'axios';
import { Toast } from 'vant';



Vue.use(VueRouter);
Vue.use(Vant);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/personal', component: Personal },
];

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const hasToken = localStorage.getItem("token");
    if (to.path === '/personal') {
        if (hasToken) {
            return next();
        } else {
            return next("/login");
        }
    }

    next();
})

axios.interceptors.response.use(res => {
    const { message, statusCode } = res.data;

    if (message && statusCode == 401) {
        Toast.fail(message);
    }

    if (message === '用户信息验证失败') {
        router.push("/login");
    }

    return res;
}, err => {
        return Toast.fail("网络错误");
})




 new Vue({
     el: "#app",
     router,
    //  data: {
    //      message: "hello webpack and vue!"
    //  }
     render: function (creatElement) {
         return creatElement(App);
     }
 })