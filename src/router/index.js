import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shopCar from '@/pages/shopCar'
import shoppingCart from '@/pages/shoppingCart'
import shopCartTwo from '@/pages/shopCartTwo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      component: shopCar
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/shopCartTwo',
      name: 'shopCartTwo',
      component: shopCartTwo
    },
    {
      path: '/testHead',
      name: 'testHead',
      component: testHead
    }
  ]
})
