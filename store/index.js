import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		_auth: {
			'token': '',
			'expire': 0,
		}, //用户令牌
		hasLogin: false,
		userInfo: {},
	},
	getters: {
		checkAuth: function(state) {
			if (state._auth.token.length == 0 || state._auth.expire.length == 0) {
				return false;
			}
			var time = parseInt((new Date().getTime()) / 1000)
			if (time >= state._auth.expire) {
				return false;
			}
			return true;
		},
		getToken: function(state) {
			return state._auth.token;
		}
	},
	mutations: {
		//设置用户令牌(参数只能是一个对象)
		token(state, provider) {
			state._auth = provider;
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	},
	actions: {

	}
})

export default store
