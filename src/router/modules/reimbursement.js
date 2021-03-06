/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

export const reimbursementRouter = {
  path: '/reimbursement',
  component: Layout,
  redirect: '/reimbursement/index',
  name: 'reimbursementRouter',
  meta: {
    title: '报销管理',
    icon: 'el-icon-s-order'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/reimbursement/index'),
      name: '我的报销',
      meta: { title: '我的报销' }
    },
    {
      path: 'audit',
      component: () => import('@/views/reimbursement/audit'),
      name: '我的审核',
      meta: { title: '我的审核', roles: [8, 10] }
    },
    {
      path: 'apply',
      component: () => import('@/views/reimbursement/apply'),
      name: '申请报销',
      hidden: true,
      meta: {
        title: '申请报销'
      }
    },
    {
      path: 'remiDetail',
      component: () => import('@/views/reimbursement/remiDetail'),
      name: '报销详情',
      hidden: true,
      meta: {
        title: '报销详情'
      }
    }
  ]
}

export const personnelRouter = {
  path: '/personnel',
  component: Layout,
  redirect: '/personnel/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/reimbursement/personnel'),
      name: '人员管理',
      meta: { title: '人员管理', icon: 'el-icon-s-marketing', roles: [8, 10] }
    }
  ]
}

export const settlementRouter = {
  path: '/settlement',
  component: Layout,
  redirect: '/settlement/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/reimbursement/settlement'),
      name: '项目结算',
      meta: { title: '项目结算', icon: 'el-icon-s-ticket', roles: [8], super: true }
    }
  ]
}
