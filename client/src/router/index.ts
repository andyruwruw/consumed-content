import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Landing from '../views/landing/landing.vue';
import Home from '../views/home/home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/login.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/category/category.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/platform/:id',
    name: 'Platform',
    component: () => import('../views/platform/platform.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/profile/profile.vue'),
  },
  {
    path: '/category',
    name: 'Categories',
    component: () => import('../views/category/categories.vue'),
  },
  {
    path: '/review',
    name: 'Reviews',
    component: () => import('../views/review/reviews.vue'),
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/show/movies.vue'),
  },
  {
    path: '/shows',
    name: 'Shows',
    component: () => import('../views/show/shows.vue'),
  },
  {
    path: '/review/:showId/:reviewId',
    name: 'Review',
    component: () => import('../views/review/review.vue'),
  },
  {
    path: '/review/:showId/:reviewId/edit',
    name: 'EditReview',
    component: () => import('../views/review/edit-review.vue'),
  },
  {
    path: '/review/:showId',
    name: 'CreateReview',
    component: () => import('../views/review/create-review.vue'),
  },
  {
    path: '/show/:id',
    name: 'Show',
    component: () => import('../views/show/show.vue'),
  },
  {
    path: '/search/:query',
    name: 'Search',
    component: () => import('../views/search/search.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
