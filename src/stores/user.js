// import Axios from 'axios'

let state = {
  user: {
  }
}

let actions = {
}

let getters = {
}

let mutations = {
  setUser (state, {user}) {
    state.user = user
  }
}

export default {
  name: 'profile',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
