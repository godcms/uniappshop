<template>
	<view class="container">
		<!--轮播图-->
		<carousel></carousel>
		<!--分类导航-->
		<catenavbar></catenavbar>
		<!--推荐商品-->
		<recommend></recommend>
		<!--猜你喜欢-->
		<guessyou></guessyou>
	</view>
</template>

<script>
	import carousel from '@/components/carousel.vue'
	import catenavbar from '@/components/catenavbar.vue'
	import recommend from '@/components/recommend.vue'
	import guessyou from '@/components/guessyou.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		///////////////////////////////////////////////////////////////////////////////////////////
		//注册组件
		///////////////////////////////////////////////////////////////////////////////////////////
		components: {
			carousel,
			catenavbar,
			recommend,
			guessyou
		},
		
		///////////////////////////////////////////////////////////////////////////////////////////
		//数据对象
		///////////////////////////////////////////////////////////////////////////////////////////
		data() {
			return {}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//属性调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		computed: {},

		///////////////////////////////////////////////////////////////////////////////////////////
		//挂载到实例上去之后调用该钩子
		///////////////////////////////////////////////////////////////////////////////////////////
		mounted: function() {
			console.log('index mounted');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		///////////////////////////////////////////////////////////////////////////////////////////
		onLoad(option) {
			console.log('index onLoad');

		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		///////////////////////////////////////////////////////////////////////////////////////////
		onShow() {
			console.log('index onShow');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面隐藏
		///////////////////////////////////////////////////////////////////////////////////////////
		onHide() {
			console.log('index onHide');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面卸载
		///////////////////////////////////////////////////////////////////////////////////////////
		onUnload() {
			console.log('index onUnload');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//函数调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {
			// 标题栏input搜索框点击
			onNavigationBarSearchInputClicked: async function(e) {
				console.log('点击了搜索框');
			},
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				const index = e.index;
				if (index === 0) {
					console.log('点击了扫描按钮');
				} else {
					console.log('点击了消息按钮');
				}
			},
		}
	}
</script>

<style lang='scss'>

</style>
