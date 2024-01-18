const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
      children: [
      { path: '/registre', component: () => import('pages/RegistroUser.vue') }, // Cambiado a una ruta relativa
    ]
  },
  {
    path: '/registro', // Cambiado a minúsculas por convención
    component: () => import('pages/RegistroUser.vue'),
    children: [
      { path: '', component: () => import('pages/RegistroUser.vue') }, // Cambiado a una ruta relativa
    ]
  },
  {
    path: '/inicio', // Cambiado a minúsculas por convención
    component: () => import('layouts/InicioUser.vue'),
    children: [
       { path: '/lista', component: () => import('pages/ListBuy.vue') }, // Cambiado a una ruta relativa
      { path: '/datos', component: () => import('pages/DatosUser.vue') },
    ]
  },
  // Siempre deja esta como la última,
  // pero también puedes eliminarla si no la necesitas
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
