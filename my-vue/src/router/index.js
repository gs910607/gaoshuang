import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Index from "@/pages/index"
import Tab from '@/pages/tab'
import PageOne from '@/pages/pageOne'
import PageTwo from '@/pages/pageTwo'
import PageThree from '@/pages/pageThree'
import NewsCenter from '@/pages/newsCenter'
import PageFour from '@/pages/PageFour'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
    		},
            {
                path: 'pageFour',
                name: 'pageFour',
                component: PageFour
            }
    	]
    },
    {
        path: '/newsCenter',
        name: 'newsCenter',
        component: NewsCenter
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },
  ]
})
