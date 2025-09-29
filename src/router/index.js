import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import Cars from '../pages/Cars.vue'
import About from '../pages/About.vue'
import Cart from '../pages/Cart.vue'
import Order from '../pages/Order.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/Login.vue'
import Sign from '../pages/Sign.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/cars', name: 'Cars', component: Cars },
  { path: '/about', name: 'About', component: About },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/order/:id?', name: 'Order', component: Order }, 
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/login', name: 'login', component: Login},
  { path: '/sign', name: 'sign', component: Sign},
  { path: '/contact', name: 'contact', component: Contact}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router