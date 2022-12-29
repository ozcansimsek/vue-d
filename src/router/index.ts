import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import CartView from "../views/CartView.vue";
import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/category/:category",
      name: "category",
      component: CategoryView,
      props: (route) => {
        category: route.params.category;
      },
    },
    {
      path: "/products/:product",
      name: "product",
      component: ProductView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
