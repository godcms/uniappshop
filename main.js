///////////////////////////////////////////////////////////////////////////////////////////////////
//入口文件，主要作用是初始化vue实例并使用需要的插件。
///////////////////////////////////////////////////////////////////////////////////////////////////

import Vue from 'vue'
import store from './store'
import App from './App'

//测试用数据
import Json from './Json' 
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {json};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
