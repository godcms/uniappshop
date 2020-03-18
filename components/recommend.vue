<template>
	<view class="recommend-section m-t-20">
		<view class="header">
			<image src="/static/temp/h1.png"></image>
			<view class="title-box">
				<text class="title-cn">精品推荐</text>
				<text class="title-en">recommend</text>
			</view>
			<text class="iconfont iconmores"></text>
		</view>
		<scroll-view class="scroll-view" scroll-x>
			<view class="scroll-wrapper">
				<view v-for="(item, index) in goodsList" :key="index" class="scroll-item" @click="navToDetailPage(item)">
					<image :src="item.image" mode="aspectFill"></image>
					<text class="title clamp">{{item.title}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</scroll-view>
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
			},
		},
	}
</script>

<style lang="scss">
	.recommend-section {
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

		.scroll-view {
			white-space: nowrap;
		}

		.scroll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.scroll-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $uni-font-size-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}
</style>
