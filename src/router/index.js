import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import Cars from '../views/Cars.vue'
import About from '../views/About.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import Checkout from '../views/Checkout.vue'
import Login from '../views/Login.vue'
import Sign from '../views/Sign.vue'
import Contact from '../views/Contact.vue'

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