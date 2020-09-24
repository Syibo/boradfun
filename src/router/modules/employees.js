/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const employeesRouter = {
  path: '/employees',
  component: Layout,
  redirect: '/employees/induction',
  name: 'Employees',
  meta: {
    title: '人事流程',
    icon: 'el-icon-s-custom',
    roles: [6, 7, 8, 9, 10]
  },
  children: [
    {
      path: 'induction',
      component: () => import('@/views/employees/index'),
      name: '员工入职',
      meta: { title: '员工入职' }
    },
    {
      path: 'positive',
      component: () => import('@/views/employees/positive'),
      name: '员工转正',
      meta: { title: '员工转正' }
    },
    {
      path: 'departure',
      component: () => import('@/views/employees/departure'),
      name: '员工离职',
      meta: { title: '员工离职' }
    }
  ]
}

// {
//     path: '/base',
//     component: Layout,
//     redirect: '/base/user',
//     alwaysShow: true, // will always show the root menu
//     name: 'Base',
//     meta: {
//       title: '基础数据',
//       icon: 'lock',
//       roles: [1]
//     },
//     children: [
//       {
//         path: 'user',
//         component: () => import('@/views/base-data/user'),
//         name: '用户维护',
//         meta: {
//           title: '用户维护'
//         }
//       },
//       {

export default employeesRouter
