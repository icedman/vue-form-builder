import { _ } from '../libs/lodash.js'

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
    },
    deleteItem(state, component) {
        var node = _.tree.findById(state.root, component.id)
        if (!node) {
          return
        }
        var parent = _.tree.findById(state.root, node.parent)
        if (!parent) {
          return
        }
        _.tree.removeChild(parent, node)
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
