import Vue from 'Vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {

	},
	actions: {
		saveForm(content) {
			axios({
				method:'post',
				url: '/user',
				data: content.state.test
			})
			.then(function(res){
				console.log(res)
			})
			.catch(function(err){
				console.log(err)
			})
		}
	},
	mutations: {

	}
})

export default store;