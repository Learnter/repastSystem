import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'Index',
      component:resolve => require(['@/components/index'],resolve),
      meta: {
        title: '首页',
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component:resolve => require(['@/components/login'],resolve),
      meta:{
        title:'登录',
        requireAuth:false
      }
    },
    {
      path:'*',
      component:resolve => require(['@/components/login'],resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('TOKEN');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
 
