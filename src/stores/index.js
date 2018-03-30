import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import ui from './ui'
import editor from './editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    [user.name]: user,
    [ui.name]: ui,
    [editor.name]: editor
  }
})
