<template>
	<view class="guessyou-section m-t-20">
		<view class="header">
			<image src="/static/temp/h1.png"></image>
			<view class="title-box">
				<text class="title-cn">猜你喜欢</text>
				<text class="title-en">guess you</text>
			</view>
			<text class="iconfont iconmores"></text>
		</view>
		<view class="guesslist">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<text class="price">￥{{item.price}}</text>
			</view>
		</view>
	</view>
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
			return {
				goodsList: [],
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始
		///////////////////////////////////////////////////////////////////////////////////////////
		created() {
			var that = this;
			this.loadData();
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
		methods: {
			//加载数据
			async loadData() {
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			//详情页
			navToDetailPage(item) {
				console.log(item);
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				});
			}
		},
	}
</script>

<style lang="scss">
	.guessyou-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.header {
			display: flex;
			align-items: center;
			height: 140upx;
			background: #fff;

			image {
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}

			.title-box {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			.title-cn {
				font-size: $uni-font-size-lg;
				color: #font-color-dark;
				line-height: 1.3;
			}

			.title-en {
				font-size: $uni-font-size-sm;
				color: $font-color-light;
			}
		}

		.guesslist {
			display: flex;
			flex-wrap: wrap;
			padding: 0 30upx;
			background: #fff;

			.guess-item {
				display: flex;
				flex-direction: column;
				width: 48%;
				padding-bottom: 40upx;

				&:nth-child(2n+1) {
					margin-right: 4%;
				}
			}

			.image-wrapper {
				width: 100%;
				height: 300upx;
				border-radius: 3px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}

			.title {
				font-size: $uni-font-size-lg;
				color: $font-color-dark;
				line-height: 80upx;
			}

			.price {
				font-size: $uni-font-size-lg;
				color: $uni-color-primary;
				line-height: 1;
			}
		}
	}
</style>
