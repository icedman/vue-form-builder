let state = {
  root: { id: 0, name: 'basic::column', children: []},
  drag: null,
  drop: null,
  active: null
}

let actions = {
}

let getters = {
}

let mutations = {
    setDrag(state, component) {
        state.drag = component
        state.active = null
    },
    setDrop(state, component) {
        state.drop = component
        state.active = null
    },
    setActive(state, component) {
        state.active = component
    },
    setRoot(state, root) {
        state.root = root
    }
}

export default {
  name: 'editor',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
