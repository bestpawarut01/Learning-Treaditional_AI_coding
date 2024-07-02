import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../views/MainviewLayout.vue';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Roadmap from '../components/Roadmap.vue';
import Analyze from '../components/Analyze.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'roadmap',
        component: Roadmap,
      },
      {
        path: 'analyze',
        component: Analyze,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
