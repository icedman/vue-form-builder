let state = {
  menu: { active: false,
    items: [
      { path:'/editor/workspace', title: 'Editor' },
      { path:'/auth/login', title: 'Logout', icon:'fa fa-sign-out-alt', right: true }
    ]
  },
  animate: false
}

let actions = {
}

let getters = {
}

let mutations = {
  setMenuActive (state, active) {
    state.menu = Object.assign(state.menu, { active: active })
  },
  setAnimate (state, animate) {
    state.animate = animate
  }
}

export default {
  name: 'ui',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
