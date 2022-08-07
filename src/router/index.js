/* eslint-disable no-param-reassign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '../store/index';

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
            to.params.boards = store.getters['boardsModule/boards'];
            to.params.starredBoards = store.getters['boardsModule/starredBoards']();
            NProgress.done();
            next();
          } catch (error) {
            console.log({ error });
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
        component: () => import('../views/EditBoardView.vue'),
        props: true,
      },
    ],
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
