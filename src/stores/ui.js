let state = {
  menu: { active: false,
    items: [
      { path:'/editor/workspace', title: 'Editor' },
      // { path:'/auth/login', title: 'Logout', icon:'fa fa-sign-out-alt', right: true }
    ],
    submenu: []
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
  setMenuItems (state, items) {
    state.menu.items = items
  },
  setSubMenu (state, items) {
    state.menu.submenu = items
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
