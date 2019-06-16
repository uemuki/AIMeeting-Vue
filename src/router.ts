import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Rooms from "./views/rooms/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/query",
      name: "rooms",
      component: Rooms
    }
  ]
});
