import Vue from "vue";
import App from "@/App.vue";
// import Router from 'vue-router'
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";


Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const router = new VueRouter({
    routes
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