// router.js — a tabela URL → componente.
import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from './pages/CatalogPage.vue'
import ItemPage from './pages/ItemPage.vue'
import NewItemPage from './pages/NewItemPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', name: 'catalog', component: CatalogPage },
  { path: '/items/new', name: 'new-item', component: NewItemPage },
  { path: '/items/:id', name: 'item', component: ItemPage },
  // Rota lazy (bónus B): o código da página só é pedido na primeira visita.
  { path: '/pokemon', name: 'pokemon', component: () => import('./pages/PokemonPage.vue') },
  // Apanha-tudo: numa SPA, o 404 é um componente.
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

export default createRouter({ history: createWebHistory(), routes })
