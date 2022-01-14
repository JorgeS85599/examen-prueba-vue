import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListadoEmpresas from '../views/ListadoEmpresas.vue'
import Empresa from '../views/Empresa.vue'
import ListadoOfertas from '../views/ListadoOfertas.vue'
import OfertaForm from '../views/OfertaForm.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: ListadoEmpresas,
    props: true
  },
  {
    path: '/viewEmpresa/:id',
    name: 'View',
    component: Empresa,
    props: true
  },
  {
    path: '/ofertas/:id',
    name: 'Ofertas',
    component: ListadoOfertas,
    props: true
  },
  {
    path: '/newOffer',
    name: 'NuevaOferta',
    component: OfertaForm
  },
  {
    path: '/editOffer/:id',
    name: 'EditOferta',
    component: OfertaForm,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
