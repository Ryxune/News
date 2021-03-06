import Vue from "vue";
import App from "@/App.vue";
// import Router from 'vue-router'
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Personal from "@/pages/Personal";
import EditInfo from "@/pages/EditInfo";
import UserFollow from "@/pages/UserFollow";
import Comment from "@/pages/Comment";
import CommentList from "@/pages/CommentList";

import Index from "@/pages/Index";
// import Category from "@/pages/Category";
import PostDetail from "@/pages/PostDetail";

import Vant from 'vant';
import { Dialog } from 'vant';
import axios from 'axios';
import { Toast } from 'vant';



Vue.use(VueRouter);
Vue.use(Vant);
Vue.use(Dialog);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/personal', component: Personal },
    { path: '/editinfo', component: EditInfo },
    { path: '/userfollow', component: UserFollow },
    { path: '/comment', component: Comment },
    { path: '/post_comment/:id', component: CommentList },

    { path: '/', component: Index },
    // { path: '/category', component: Category },

    { path:'/post_detail/:id', component:PostDetail }
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




let app = new Vue({
     el: "#app",
     router,
    //  data: {
    //      message: "hello webpack and vue!"
    //  }
     render: function (creatElement) {
         return creatElement(App);
     }
 })