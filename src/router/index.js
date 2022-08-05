import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/boards',
    component: () => import('../views/ContainerBoardView.vue'),
    children: [
      {
        path: '',
        name: 'boards-view',
        component: () => import('../views/BoardsView.vue'),
      },
      {
        path: ':id',
        name: 'single-board-view',
        props: true,
        component: () => import('../views/SingleBoardView.vue'),
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
});

export default router;
