import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '任务看板',
        meta: { title: '任务看板', icon: 'dashboard', affix: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true },

  {
    path: '/measure',
    component: Layout,
    redirect: '/measure',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'measure',
        component: () => import('@/views/measure/list'),
        name: '提测',
        meta: { title: '提测', icon: 'guide' }
      }
    ]
  },

  {
    path: '/confirm',
    component: Layout,
    redirect: '/confirm',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'confirm',
        component: () => import('@/views/confirm/list'),
        name: '对接待确认',
        meta: { title: '对接待确认', icon: 'user' }
      }
    ]
  },

  {
    path: '/docking',
    component: Layout,
    redirect: '/docking',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'docking',
        component: () => import('@/views/docking/list'),
        name: '需求对接中',
        meta: { title: '需求对接中', icon: 'lock' }
      }
    ]
  },

  {
    path: '/distribution',
    component: Layout,
    redirect: '/distribution',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'distribution',
        component: () => import('@/views/distribution/list'),
        name: '待资源分配',
        meta: { title: '待资源分配', icon: 'example' }
      }
    ]
  },

  {
    path: '/wait',
    component: Layout,
    redirect: '/wait',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'wait',
        component: () => import('@/views/wait-execution/list'),
        name: '等待执行任务',
        meta: { title: '等待执行任务', icon: 'tab' }
      }
    ]
  },

  {
    path: '/execution',
    component: Layout,
    redirect: '/execution',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'execution',
        component: () => import('@/views/execution/list'),
        name: '执行中任务',
        meta: { title: '执行中任务', icon: 'excel' }
      }
    ]
  },

  {
    path: '/audit',
    component: Layout,
    redirect: '/audit',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'audit',
        component: () => import('@/views/audit/list'),
        name: '待审核任务',
        meta: { title: '待审核任务', icon: 'pdf' }
      }
    ]
  },

  {
    path: '/statement',
    component: Layout,
    redirect: '/statement/list',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/statement/list'),
        name: '已结单任务',
        meta: { title: '已结单任务', icon: 'zip' }
      }
    ]
  },

  {
    path: '/base',
    component: Layout,
    redirect: '/base/user',
    alwaysShow: true, // will always show the root menu
    name: 'Base',
    meta: {
      title: '基础数据',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/base-data/user'),
        name: '用户维护',
        meta: {
          title: '用户维护',
          roles: ['admin']
        }
      },
      {
        path: 'customer',
        component: () => import('@/views/base-data/customer'),
        name: '客户维护',
        meta: {
          title: '客户维护',
          roles: ['admin']
        }
      },
      {
        path: 'service',
        component: () => import('@/views/base-data/service'),
        name: '服务类型',
        meta: {
          title: '服务类型',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/lines',
    component: Layout,
    redirect: '/lines/list',
    alwaysShow: true, // will always show the root menu
    name: 'Lines',
    meta: {
      title: '额度管理',
      icon: 'theme',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/lines/list'),
        name: '额度管理列表',
        meta: {
          title: '额度管理列表',
          roles: ['admin']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
