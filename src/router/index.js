import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Beleuchtung from '../views/Beleuchtung.vue';
import Bewaesserung from '../views/Bewaesserung.vue';
import Ventilation from '../views/Ventilation.vue';
import Einstellungen from '../views/Einstellungen.vue';
import Zeitreihen from '../views/Zeitreihen.vue';
import Log from '../views/Log.vue';
import VentilationEinstellungen from '../views/VentilationEinstellungen.vue';
import BeleuchtungEinstellungen from '../views/BeleuchtungEinstellungen.vue';
import BewaesserungEinstellungen from '../views/BewaesserungEinstellungen.vue';

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
  {
    path: '/log',
    name: 'log',
    component: Log,
  },
  {
    path: '/beleuchtungseinstellungen',
    name: 'BeleuchtungEinstellungen',
    component: BeleuchtungEinstellungen,
  },
  {
    path: '/bewaesserungseinstellungen',
    name: 'BewaesserungEinstellungen',
    component: BewaesserungEinstellungen,
  },
  {
    path: '/ventilationseinstellungen',
    name: 'VentilationEinstellungen',
    component: VentilationEinstellungen,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
