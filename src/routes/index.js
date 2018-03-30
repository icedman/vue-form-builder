import Vue from 'vue'
import Router from 'vue-router'
import { Page, PageWithNav } from '../layouts/'
import { Login, Register } from '../views/'
import { Editor } from '../views/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editor',
      name: 'Editor',
      component: PageWithNav,
      children: [
        {
          path: 'workspace',
          name: 'Workspace',
          component: Editor
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Page,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    },
    { path: '*', redirect: '/editor/workspace' }
  ]
  // mode: 'history' // removes '#' from url
})
