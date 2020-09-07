import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/vol-eme-hab',
    name: 'VoluntarioEmeHabilidad',
    component: () => import('../views/VoluntarioEmeHabilidad')
  },
  {
    path: '/vol-geo',
    name: 'VoluntarioGeo',
    component: () => import('../views/Voluntario_geoespacial')
  },
  {
    path: '/log-tarea',
    name: 'LogTarea',
    component: () => import('../views/LogTarea')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
