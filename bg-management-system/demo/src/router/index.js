import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      component:()=>import('@/components/pages/login')
    },
    {
      path:'/index',
      component:()=>import('@/components/pages/index'),
      children:[
        {
          path:'/home',
          component:()=>import('@/components/views/home')
        },
        {
          path:'/role',
          component:()=>import('@/components/views/role'),
          meta:{
            name:'角色管理'
          }
        },
        {
          path:'/menu',
          component:()=>import('@/components/views/menu'),
          meta:{
            name:'菜单管理'
          }
        },
        {
          path:'/user',
          component:()=>import('@/components/views/user'),
          meta:{
            name:'管理员管理'
          }
        },
        {
          path:'/goods',
          component:()=>import('@/components/views/goods'),
          meta:{
            name:'商品管理'
          }
        },
        {
          path:'/cate',
          component:()=>import('@/components/views/cate'),
          meta:{
            name:'商品分类'
          }
        },
        {
          path: '/specs',
          component: () => import('@/components/views/specs'),
          meta: {
            name: '商品规格'
          }
        },
        {
          path: '/member',
          component: () => import('@/components/views/member'),
          meta:{
              name:'会员管理'
          }
        },
        {
          path: '/banner',
          component: () => import('@/components/views/banner'),
          meta:{
              name:'轮播图管理'
          }
        },
        {
          path: '/seck',
          component: () => import('@/components/views/seck'),
          meta:{
              name:'限时秒杀管理'
          }
        },
        {
          path:'',
          redirect:()=>import('@/components/views/home')
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'

    }
  ]
})
