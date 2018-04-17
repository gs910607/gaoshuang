import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import hello from '@/pages/hello'
import list from '@/pages/list'
import add from '@/pages/add'
import tab from '@/pages/tab'
import first from '@/pages/tab/first'
import second from '@/pages/tab/second'
import three from '@/pages/tab/three'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
    	path: '/hello',
    	name: 'hello',
    	component: hello,
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab,
      redirect: '/tab/first',
      children: [
        {
          path: 'first',
          name: 'first',
          component: first
        },
        {
          path: 'second',
          name: 'second',
          component: second
        },
        {
          path: 'three',
          name: 'three',
          component: three
        }
      ]

    }

  ]
})
