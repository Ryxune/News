import Vue from "vue";
import App from "@/App.vue"
// import Router from 'vue-router'
import VueRouter from "vue-router";
import Login from "@/pages/Login"


Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login }
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