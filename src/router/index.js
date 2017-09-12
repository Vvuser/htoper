import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import CityList from '@/components/cityList/cityList'
import User from '@/components/user/user'
import Order from '@/components/order/order'
import Stations from '@/components/stations/stations'
import Lines from '@/components/lines/lines'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      redirect:'/cityList',
      component: Home,
      children:[{
      	path:'/cityList',
      	component: CityList
      },
      {
      	path:'/user',
      	component: User
      },
      {
      	path:'/order',
      	component: Order
      },
      {
      	path:'/stations',
      	component: Stations
      },
      {
      	path:'/lines',
      	component: Lines
      }]
    }
  ]
})
