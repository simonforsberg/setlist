import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Header from "../views/Header.vue";
import Footer from "../views/Footer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "header",
      component: Header,
    },
    {
      path: "/",
      name: "footer",
      component: Footer,
    },
  ],
});

export default router;
