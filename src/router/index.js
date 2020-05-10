import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Beleuchtung from '../views/Beleuchtung.vue';
import Bewaesserung from '../views/Bewaesserung.vue';
import Ventilation from '../views/Ventilation.vue';
import Einstellungen from '../views/Einstellungen.vue';
import Zeitreihen from '../views/Zeitreihen.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/beleuchtung',
    name: 'Beleuchtung',
    component: Beleuchtung,
  },
  {
    path: '/bewaesserung',
    name: 'Bewaesserung',
    component: Bewaesserung,
  },
  {
    path: '/ventilation',
    name: 'Ventilation',
    component: Ventilation,
  },
  {
    path: '/einstellungen',
    name: 'Einstellungen',
    component: Einstellungen,
  },
  {
    path: '/zeitreihen',
    name: 'Zeitreihen',
    component: Zeitreihen,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
