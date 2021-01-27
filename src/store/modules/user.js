import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  userId: 0,
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 去掉登录
  // login({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     const data = {
  //       'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  //       'introductio': 'I am a super administrator',
  //       'name': 'test',
  //       'id': 1,
  //       'roles': [1]
  //     }
  //     commit('SET_TOKEN', data)
  //     setToken(data)
  //     commit('SET_USERINFO', data)
  //     resolve()
  //   })
  // },

  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { username, password } = userInfo
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        commit('SET_USERINFO', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let day = ''
      if (typeof (state.token) === 'object') {
        day = state.token
      } else {
        day = JSON.parse(state.token)
      }
      const data = {
        'name': day.name,
        'id': day.ID,
        'roles': [day.userType]
      }
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      const { roles, name, id } = data
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_USERID', id)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
