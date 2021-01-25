import { asyncRoutes, constantRoutes } from '@/router'
import { getToken } from '@/utils/auth'
import { SUPER_ADMIN_EMAIL } from '@/utils/const'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 第一个if是判断当前用户是不是马总
    // 因为当前并没有一个超级管理员的权限， 马总的userTpye也是10
    // 所以目前根据meta里面的super判断当前登录账号的Email是不是 SUPER_ADMIN_EMAIL
    let userInfo = getToken()
    if (typeof (day) === 'object') {
      console.log('isSuper', userInfo)
    } else {
      userInfo = JSON.parse(userInfo)
    }
    let status = false
    status = userInfo.email === SUPER_ADMIN_EMAIL
    if (status) {
      return true
    } else {
      return roles.some(role => route.meta.roles.includes(role))
    }
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
