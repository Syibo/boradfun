/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export const propertyRouter = {
  path: '/property',
  component: Layout,
  redirect: '/property/index',
  name: 'propertyRouter',
  meta: {
    title: '资产管理',
    icon: 'el-icon-s-platform'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/property/index'),
      name: '我的资产',
      meta: { title: '我的资产' }
    },
    {
      path: 'equipment',
      component: () => import('@/views/property/equipment'),
      name: '设备列表',
      meta: { title: '设备列表' }
    },
    {
      path: 'apply',
      component: () => import('@/views/property/apply'),
      name: '我的申请',
      meta: { title: '我的申请' }
    },
    {
      path: 'audit',
      component: () => import('@/views/property/audit'),
      name: '待我审核',
      meta: { title: '待我审核' }
    },
    {
      path: 'consumable',
      component: () => import('@/views/property/consumable'),
      name: '易耗品',
      meta: { title: '易耗品' }
    },
    {
      path: 'comsumdetail',
      component: () => import('@/views/property/comsumdetail'),
      name: '易耗品详情',
      hidden: true,
      meta: { title: '易耗品详情' }
    },
    {
      path: 'info',
      component: () => import('@/views/property/info'),
      name: '资产信息表',
      group: '设置',
      meta: { title: '资产信息表' }
    },
    {
      path: 'depreciation',
      component: () => import('@/views/property/depreciation'),
      name: '折旧表',
      meta: { title: '折旧表' }
    }
  ]
}

export default propertyRouter
