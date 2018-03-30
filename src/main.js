import Vue from 'vue'
import Axios from 'axios'
import Store from './stores'
import Router from './routes'
import { sync } from 'vuex-router-sync'
import { _ } from './libs/lodash.js'

import App from './App.vue'
import 'bulma/css/bulma.css'
import { Components } from './editor'

Vue.prototype.$_ = _
Vue.prototype.$editor = Components

Vue.config.ignoredElements = [/^ion-/]

sync(Store, Router, { moduleName: 'route' })
Router.beforeEach((to, from, next) => {
  Store.commit('ui/setMenuActive', false)
  Store.commit('ui/setAnimate', false)
  next()
})
Router.afterEach((to, from) => {
  _.fitContent()
  setTimeout(() => { _.lazy() }, 50)
  setTimeout(() => { Store.commit('ui/setAnimate', true) }, 500)
})

window.addEventListener('resize', _.debounce(_.fitContent, 10))

new Vue({
  el: '#app',
  store: Store,
  router: Router,
  render: h => h(App)
})
