import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import employeesRouter from './modules/employees'
import archivesRouter from './modules/archives'
import attendanceRouter from './modules/attendance'
import propertyRouter from './modules/property'
import { reimbursementRouter, personnelRouter, settlementRouter } from './modules/reimbursement'

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
    redirect: '/workbench',
    children: [
      {
        path: 'workbench',
        component: () => import('@/views/workbench/index'),
        name: '工作台',
        meta: { title: '工作台', icon: 'el-icon-s-grid' }
      }
    ]
  },

  archivesRouter,
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '任务看板',
  //       meta: { title: '任务看板', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'task',
  //       component: () => import('@/views/dashboard/task'),
  //       name: '任务详情',
  //       hidden: true,
  //       meta: { title: '任务详情', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'history',
  //       component: () => import('@/views/dashboard/history'),
  //       name: '历史版本',
  //       hidden: true,
  //       meta: {
  //         title: '历史版本'
  //       }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true },

  employeesRouter,
  attendanceRouter,
  reimbursementRouter,
  personnelRouter,
  settlementRouter,
  propertyRouter

  // {
  //   path: '/base',
  //   component: Layout,
  //   redirect: '/base/user',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Base',
  //   meta: {
  //     title: '基础数据',
  //     icon: 'lock',
  //     roles: [1]
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/base-data/user'),
  //       name: '用户维护',
  //       meta: {
  //         title: '用户维护'
  //       }
  //     },
  //     {
  //       path: 'customer',
  //       component: () => import('@/views/base-data/customer'),
  //       name: '客户维护',
  //       meta: {
  //         title: '客户维护'
  //       },
  //       children: [
  //         {
  //           path: 'info',
  //           component: () => import('@/views/base-data/cus-info'),
  //           name: '客户信息',
  //           hidden: true,
  //           meta: {
  //             title: '客户信息'
  //           },
  //           children: [
  //             {
  //               path: 'ser',
  //               component: () => import('@/views/base-data/service-info'),
  //               name: '服务详情',
  //               hidden: true,
  //               meta: {
  //                 title: '服务详情'
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path: 'service',
  //       component: () => import('@/views/base-data/service'),
  //       name: '服务类型',
  //       meta: {
  //         title: '服务类型',
  //         roles: [1, 2, 3, 4, 5]
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/task',
  //   component: Layout,
  //   redirect: '/task/dashboard',
  //   alwaysShow: true,
  //   name: 'Task',
  //   meta: {
  //     title: '任务管理',
  //     icon: 'lock'
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '任务看板',
  //       meta: { title: '任务看板', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'task',
  //       component: () => import('@/views/dashboard/task'),
  //       name: '任务详情',
  //       hidden: true,
  //       meta: { title: '任务详情', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'history',
  //       component: () => import('@/views/dashboard/history'),
  //       name: '历史版本',
  //       hidden: true,
  //       meta: {
  //         title: '历史版本'
  //       }
  //     },
  //     {
  //       path: 'lines',
  //       component: () => import('@/views/lines/list'),
  //       name: '额度',
  //       meta: { title: '额度', icon: 'guide' }
  //     }
  //   ]
  // }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
