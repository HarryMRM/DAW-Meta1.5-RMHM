// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Imagen',
        component: () => import('@/views/ImagenVista.vue'),
      },
      {
        path: 'Tabla',
        name: 'Tabla',
        component: () => import('@/views/TablaVista.vue'),
      },
      {
        path: 'Matriz',
        name: 'Matriz',
        component: () => import('@/views/MatrizCardsVista.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router