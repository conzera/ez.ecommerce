
import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import CartView from "../views/CartView.vue";
import ContactView from "../views/ContactView.vue";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import CategoryView from "../views/CategoryView.vue";
import SortView from "../views/SortView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product",
      name: "product",
      component: ProductView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/sort',
      name: 'sort',
      component: SortView,
    }
  ],
});

export default router;
