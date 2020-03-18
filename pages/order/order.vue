<template>
	<view class="container">

		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">

					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						aaa
					</view>

				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import Json from '@/Json';
	export default {
		///////////////////////////////////////////////////////////////////////////////////////////
		//注册组件
		///////////////////////////////////////////////////////////////////////////////////////////
		components: {},

		///////////////////////////////////////////////////////////////////////////////////////////
		//数据对象
		///////////////////////////////////////////////////////////////////////////////////////////
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '售后',
						loadingType: 'more',
						orderList: []
					}
				],
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//属性调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		computed: {},

		///////////////////////////////////////////////////////////////////////////////////////////
		//挂载到实例上去之后调用该钩子
		///////////////////////////////////////////////////////////////////////////////////////////
		mounted: function() {
			console.log('order mounted');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		///////////////////////////////////////////////////////////////////////////////////////////
		onLoad(option) {
			console.log('order onLoad');
			if (option.state) {
				this.tabCurrentIndex = parseInt(option.state);
			}
			this.loadData();
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		///////////////////////////////////////////////////////////////////////////////////////////
		onShow() {
			console.log('order onShow');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面隐藏
		///////////////////////////////////////////////////////////////////////////////////////////
		onHide() {
			console.log('order onHide');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面卸载
		///////////////////////////////////////////////////////////////////////////////////////////
		onUnload() {
			console.log('order onUnload');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//函数调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}
				navItem.loadingType = 'loading';
				setTimeout(() => {
					let orderList = Json.orderList.filter(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						//演示数据所以自己进行状态筛选
						if (state === 0) {
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					//添加不同状态下订单的表现形式
					orderList.forEach(item => {
						navItem.orderList.push(item);
					});
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);
					//判断是否还有数据， 有改为 more， 没有改为noMore
					navItem.loadingType = 'more';
				}, 600);
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateText = '',
					stateColor = '#fa436a';
				switch (+state) {
					case 1:
						stateText = '待付款';
						break;
					case 2:
						stateText = '待发货';
						break;
					case 9:
						stateText = '订单已关闭';
						stateColor = '#909399';
						break;

						//更多自定义
				}
				return {
					stateText,
					stateColor
				};
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.container {
		background: $page-color-base;
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $page-color-primary;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $page-color-primary;
				}
			}
		}
	}
	
	.swiper-box {
		height: calc(100% - 40px);
	}
	
	.list-scroll-content {
		height: 100%;
	}
	
	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
	
		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $uni-font-size-base;
			color: $font-color-dark;
			position: relative;
	
			.time {
				flex: 1;
			}
	
			.state {
				color: #fa436a;
			}
	
			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $uni-font-size-lg;
				color: $font-color-light;
				position: relative;
	
				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	
		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
	
			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
	
			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	
		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;
	
			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}
	
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
	
				.title {
					font-size: $uni-font-size-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
	
				.attr-box {
					font-size: $uni-font-size-base + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
	
				.price {
					font-size: $uni-font-size-base + 2upx;
					color: $font-color-dark;
	
					&:before {
						content: '￥';
						font-size: $uni-font-size-base;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
	
		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $uni-font-size-base + 2upx;
			color: $font-color-light;
	
			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}
	
			.price {
				font-size: $uni-font-size-lg;
				color: $font-color-dark;
	
				&:before {
					content: '￥';
					font-size: $uni-font-size-base;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	
		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
	
		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $uni-font-size-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
	
			&:after {
				border-radius: 100px;
			}
	
			&.recom {
				background: #fff9f9;
				color: #fa436a;
	
				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}
	
</style>
