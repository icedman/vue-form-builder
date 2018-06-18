import { _ } from '../libs/lodash.js'
import $http from 'axios'
 
let createPage = function() { return { id: _.tree.guid(), name: 'basic::page', children: [], options: { name:'new page' } } }

let state = {
  baseUrl: null,
  project: { name: '', export: '', pages: [ createPage() ], lastOpened: null },
  root: createPage(),
  drag: null,
  drop: null,
  active: null,
}

state.project.root = state.project.pages[0]

let actions = {
  loadFromLocalStorage ({commit, state}) {
    try {
      var localCopy = JSON.parse(window.localStorage.getItem('editor-project'))
      if (localCopy) {
        commit('setProject', localCopy)
        commit('setActive', null)
        commit('setRoot', state.project.pages[0])
      }
      commit('setActive', null)
      commit('setRoot', state.project.pages[0])
    } catch(e) {
      //
    }
  },

  saveToLocalStorage ({commit, state}) {
    try {
      window.localStorage.setItem('editor-project', JSON.stringify(state.project))
    } catch(e) {
      //
    }
  },

  loadPage({commit, state}, page) {
    if (!state.baseUrl) {
      commit('setRoot', page)
      commit('setActive', page)
      return
    }
    var url = state.baseUrl + '/page/' + page.id
    $http.get (url)
    .then(response=>{
      if (typeof(response.data) == 'object') {
        page = response.data
      }
      commit('setRoot', page)
      commit('setActive', page)
    })
    .catch(err=>{
      console.log(err)
    })
  },

  savePage ({commit, state}, page) {
    if (!state.baseUrl) {
      return
    }
    var url = state.baseUrl + '/page'
    $http.post (url, page)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  },

  saveRenderedPage ({commit, state}, page) {
    if (!state.baseUrl) {
      return
    }
    var url = state.baseUrl + '/page/html'
    $http.post (url, page)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  },

  deletePage ({commit, state}, page) {
    commit('deletePage', page)
    if (!state.baseUrl) {
      return
    }
    var url = state.baseUrl + '/page'
    $http.delete (url, page)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  },

  loadProject ({commit, dispatch, state}) {
    if (!state.baseUrl) {
      dispatch('loadFromLocalStorage')
      return
    }
    var url = state.baseUrl + '/project'
    $http.get (url)
    .then(response=>{
      if (!response.data.pages) {
        // new project?
        state.project.lastOpened = null
        state.project.pages = [ createPage() ]
        state.root = state.project.pages[0]
        return
      }

      var pages = response.data.pages.map(p=>{
        return {
          id: p.id,
          name: p.name,
          options: { name: p.title }
        }
      })

      state.project.lastOpened = response.data.lastOpened
      state.project.pages = pages
      if (pages.length) {
        var page = pages.find(p=>p.id == state.project.lastOpened)
        if (!page) {
          page = pages[0]
        }
        dispatch('loadPage', page)
      }
    })
    .catch(err=>{
      console.log(err)
    })

  },

  saveProject ({commit, dispatch, state}) {
    if (!state.baseUrl) {
      dispatch('saveToLocalStorage')
      return
    }
    var pages = (state.project.pages || []).map(p=>{
      return { id: p.id, name: p.name, title: p.options['name'] }
    })

    var data = {
      lastOpened: state.project.lastOpened,
      pages: pages
    }

    var url = state.baseUrl + '/project'
    $http.post (url, data)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

let getters = {
}

let mutations = {
    setDrag (state, component) {
        state.drag = component
        state.active = null
    },
    setDrop (state, component) {
        state.drop = component
        state.active = null
    },
    setActive (state, component) {
        state.active = component
    },
    setProject (state, project) {
        state.project = project
    },
    setRoot (state, root) {
        state.root = root
        state.project.lastOpened = root.id
        // update project name pages list
        var page = state.project.pages.find(p=>p.id == root.id)
        page.options = root.options
    },
    deleteItem (state, component) {
        var node = _.tree.findById(state.root, component.id)
        if (!node) {
          return
        }
        var parent = _.tree.findById(state.root, node.parent)
        if (!parent) {
          return
        }
        _.tree.removeChild(parent, node)
    },
    newPage (state) {
      state.project.pages = [...state.project.pages, createPage()]
    },
    savePage (state, item) {
      var p = state.project.pages.find(p=>p.id == item.id)
      if (p) {
        p = Object.assign(p, item)
      } else {
        state.project.pages = [...state.project.pages, page]
      }
    },
    deletePage (state, item) {
      var idx = state.project.pages.map(p=>p.id).indexOf(item.id)
      if (idx != -1) {
        state.project.pages.splice(idx,1)
      }

      // new page
      if (state.project.pages.length == 0) {
        state.project.pages = [ createPage() ]
      }

      state.active = state.project.pages[0]
      state.root = state.project.pages[0]
      state.project.lastOpened = null

    },
}

export default {
  name: 'editor',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
