import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Menu from './pages/Menu.vue';

import routes from './pages/routes';


const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    ...routes
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('token');

  if (!accessToken) {
    if (to.path !== '/') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (to.path === '/') {
      next({ path: '/menu' });
    } 
    else if (!router.getRoutes().find(route => route.path === to.path)) {
      next({ path: '/menu' });
    } else {
      next();
    }
  }
});

export default router