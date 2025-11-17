import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import Cars from "../pages/Cars.vue";
import About from "../pages/About.vue";
import Cart from "../pages/Cart.vue";
import OrderConfirmation from "../pages/OrderConfirmation.vue";
import Checkout from "../pages/Checkout.vue";
import Login from "../pages/Login.vue";
import Sign from "../pages/Sign.vue";
import Contact from "../pages/Contact.vue";
import CreateCar from "../pages/CreateCar.vue";
import SeeMore from "../pages/SeeMore.vue";
import PayOrder from "../pages/PayOrder.vue";
import carsSellPerBrand from "../pages/carsSellPerBrand.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/cars", name: "Cars", component: Cars },
  { path: "/carsPerBrand", name: "carsPerBrand", component: carsSellPerBrand },
  { path: "/about", name: "About", component: About },
  { path: "/cart/:id", name: "Cart", component: Cart, props: true },
  {
    path: "/confirmation/:transactionId'",
    name: "confirmation",
    component: OrderConfirmation,
    props: true,
  },
  { path: "/checkout", name: "Checkout", component: Checkout },
  {
    path: "/pay-order/:id",
    name: "pay-order",
    component: PayOrder,
    props: true,
  },
  { path: "/login", name: "login", component: Login },
  { path: "/sign", name: "sign", component: Sign },
  { path: "/contact", name: "contact", component: Contact },
  { path: "/createCar", name: "createCar", component: CreateCar },
  { path: "/seeMore/:id", name: "seeMore", component: SeeMore, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
     return { top: 0 };
  },
});

export default router;
