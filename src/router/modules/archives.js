/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const archivesRouter = {
  path: '/archives',
  component: Layout,
  redirect: '/archives/all',
  name: 'archives',
  meta: {
    title: '档案信息',
    icon: 'nested'
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/archives/index'),
      name: '所有员工信息',
      meta: { title: '所有员工信息' }
    },
    {
      path: 'contract',
      component: () => import('@/views/archives/contract'),
      name: '合同信息',
      meta: { title: '合同信息' }
    },
    {
      path: 'hire',
      component: () => import('@/views/archives/hire'),
      name: '招工信息',
      meta: { title: '招工信息' }
    },
    {
      path: 'termination',
      component: () => import('@/views/archives/termination'),
      name: '退工信息',
      meta: { title: '退工信息' }
    }
  ]
}

export default archivesRouter
