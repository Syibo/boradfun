/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const attendanceRouter = {
  path: '/attendance',
  component: Layout,
  redirect: '/attendance/month',
  name: 'attendanceRouter',
  meta: {
    title: '考勤管理',
    icon: 'el-icon-s-data'
  },
  children: [
    {
      path: 'month',
      component: () => import('@/views/attendance/index'),
      name: '月考勤记录',
      meta: { title: '月考勤记录' }
    },
    {
      path: 'day',
      component: () => import('@/views/attendance/day'),
      name: '日考勤记录',
      meta: { title: '日考勤记录' }
    },
    {
      path: 'workOvertime',
      component: () => import('@/views/attendance/workOvertime'),
      name: '加班记录',
      meta: { title: '加班记录' }
    },
    {
      path: 'vacate',
      component: () => import('@/views/attendance/vacate'),
      name: '请假记录',
      meta: { title: '请假记录' }
    }
  ]
}

export default attendanceRouter
