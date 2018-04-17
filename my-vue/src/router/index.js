import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from "@/pages/index"
import Tab from '@/pages/tab'
import PageOne from '@/pages/pageOne'
import PageTwo from '@/pages/pageTwo'
import PageThree from '@/pages/pageThree'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
    	path: '/helloWorld',
    	name: 'helloWorld',
    	component: HelloWorld
    },
    {
    	path: '/tab',
    	name: 'tab',
    	redirect: '/tab/pageOne',
    	component: Tab,
    	children: [
    		{
    			path: 'pageOne',
    			name: 'pageOne',
    			component: PageOne
    		},
    		{
    			path: 'pageTwo',
    			name: 'pageTwo',
    			component: PageTwo
    		},
    		{
    			path: 'pageThree',
    			name: 'pageThree',
    			component: PageThree
    		}
    	]
    }
  ]
})
