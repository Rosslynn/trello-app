/* eslint-disable no-param-reassign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '../store/index';

import { defineReactiveProperty } from '../utils/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/boards',
    component: () => import('../views/ContainerBoardView.vue'),
    children: [
      {
        path: '',
        name: 'boards-view',
        props: true,
        async beforeEnter(to, from, next) {
          NProgress.start();
          try {
            await store.dispatch('boardsModule/obtainBoards');
            defineReactiveProperty(to.params, 'boards', 'boardsModule/boards');
            defineReactiveProperty(to.params, 'starredBoards', 'boardsModule/starredBoards');
            NProgress.done();
            next();
          } catch (error) {
            next({ name: 'not-found-view' });
            console.log(error);
          }
        },
        component: () => import('../views/BoardsView.vue'),
      },
      {
        path: ':id',
        name: 'single-board-view',
        props: true,
        component: () => import('../views/SingleBoardView.vue'),
      },
      {
        path: ':id/edit',
        name: 'edit-board',
        props: true,
        async beforeEnter(to, from, next) {
          NProgress.start();
          try {
            const { id } = to.params;
            await store.dispatch('boardsModule/getSingleBoard', id);
            defineReactiveProperty(to.params, 'board', 'boardsModule/board');
            NProgress.done();
            next();
          } catch (error) {
            next({ name: 'not-found-view', params: { resource: 'board' } });
            console.log(error);
          }
        },
        component: () => import('../views/EditBoardView.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: 'not-found-view',
    props: true,
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '*',
    redirect: { name: 'boards-view' },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

export default router;
