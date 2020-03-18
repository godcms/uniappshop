<template>
	<!-- S分类 -->
	<view class="cate-section">
		<view class="cate-item">
			<image src="/static/temp/c3.png"></image>
			<text>环球美食</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c5.png"></image>
			<text>个护美妆</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c6.png"></image>
			<text>营养保健</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c7.png"></image>
			<text>家居厨卫</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c8.png"></image>
			<text>速食生鲜</text>
		</view>
	</view>
	<!-- E分类 -->
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		///////////////////////////////////////////////////////////////////////////////////////////
		//数据对象
		///////////////////////////////////////////////////////////////////////////////////////////
		data() {
			return {};
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始
		///////////////////////////////////////////////////////////////////////////////////////////
		created() {
			var that = this;
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//接收数据
		///////////////////////////////////////////////////////////////////////////////////////////
		props: {},

		///////////////////////////////////////////////////////////////////////////////////////////
		//计算属性
		///////////////////////////////////////////////////////////////////////////////////////////
		computed: {},

		///////////////////////////////////////////////////////////////////////////////////////////
		//事件函数
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {},
	}
</script>

<style lang="scss">
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $uni-font-size-sm + 2upx;
			color: $font-color-dark;
		}

		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
</style>
