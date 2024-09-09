import Router from 'vue-router';

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '*',
      redirect:"/"
    },
    {   path: '/index.html',
        redirect:"/"
    },
    {
      path: '/',
      component: () => import('../views/Dashboard/Dashboard.vue'),
      children:[
        {
          path: '/',
          name: 'proshop_menu',
          component: () => import('../views/Comanda/Cuenta.vue'),
        },
      ],
    },
  ]
});

router.beforeEach(async (to, from, next) => {
 
  
  next();
})

export default router;