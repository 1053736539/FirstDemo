import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import sampleDocumentOne from '@/pages/sampleDocumentOne'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'sampleDocumentOne',
      name: 'sampleDocumentOne',
      component: sampleDocumentOne
    }
  ]
})
