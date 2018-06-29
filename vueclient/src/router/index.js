import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from '../components/Signup'
import Login from '../components/Login'
import vueAxios from 'vue-axios'
import Axios from '../services/Api.js'
Vue.use(Router,vueAxios,Axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/signup',
      name:'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
