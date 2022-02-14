import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Landing from '../views/Landing.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/Category.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/review',
    name: 'Reviews',
    component: () => import('../views/Reviews.vue'),
  },
  {
    path: '/review/:showId/:userId',
    name: 'Review',
    component: () => import('../views/Review.vue'),
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue'),
  },
  {
    path: '/shows',
    name: 'Shows',
    component: () => import('../views/Shows.vue'),
  },
  {
    path: '/show/:id',
    name: 'Show',
    component: () => import('../views/Show.vue'),
  },
  {
    path: '/review/:showId',
    name: 'WriteReview',
    component: () => import('../views/WriteReview.vue'),
  },
  {
    path: '/platform/:platformId',
    name: 'Platform',
    component: () => import('../views/Platform.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
