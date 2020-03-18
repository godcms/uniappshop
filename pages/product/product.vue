<template>
	<view class="container">

		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">恒源祥2019春季长袖白色t恤 新款春装</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">341.6</text>
				<text class="m-price">¥488</text>
				<text class="coupon-tip">7折</text>
			</view>
			<view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view>
		</view>

		<!--  分享 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="iconfont iconshoucang"></text>返
			</view>
			<text class="title">该商品分享可领49减10红包</text>
			<view class="share-btn">
				立即分享<text class="iconfont iconmoreb"></text>
			</view>
		</view>

		<!-- 选项 -->
		<view class="list-section">
			<view class="sec-row b-b" @click="toggleSpec">
				<text class="tit">产品规格</text>
				<view class="con">
					XS 白色
				</view>
				<text class="iconfont iconmores"></text>
			</view>
			<view class="sec-row b-b">
				<text class="tit">优惠券</text>
				<text class="con red">领取优惠券</text>
				<text class="iconfont iconmores"></text>
			</view>
			<view class="sec-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view>
			<view class="sec-row b-b">
				<text class="tit">服务承诺</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="eva-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="iconfont iconmores"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 图文详情 -->
		<view class="detail-desc">
			<view class="desc-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="iconfont iconshouye"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="iconfont icongouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="iconfont iconhongxin"></text>
				<text>收藏</text>
			</view>
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view>

		<!--商品规格-->
		<goodspec ref="goodspec" @onselected="specChange"></goodspec>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import goodspec from '@/components/goodspec.vue';
	export default {
		///////////////////////////////////////////////////////////////////////////////////////////
		//注册组件
		///////////////////////////////////////////////////////////////////////////////////////////
		components: {
			goodspec
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//数据对象
		///////////////////////////////////////////////////////////////////////////////////////////
		data() {
			return {
				favorite: true,
				imgList: [{
						src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
					}
				],
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
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
			console.log('product mounted');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		///////////////////////////////////////////////////////////////////////////////////////////
		onLoad(option) {
			console.log('product onLoad');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		///////////////////////////////////////////////////////////////////////////////////////////
		onShow() {
			console.log('product onShow');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面隐藏
		///////////////////////////////////////////////////////////////////////////////////////////
		onHide() {
			console.log('product onHide');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面卸载
		///////////////////////////////////////////////////////////////////////////////////////////
		onUnload() {
			console.log('product onUnload');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//函数调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {
			//显示商品规格
			toggleSpec() {
				this.$refs.goodspec.toggleSpec();
			},
			//规格选择事件
			specChange(data) {
				console.log(data);
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
			flex-shrink: 0;
			position: relative;
			font-size: 0;
			background: #f3f3f3;
			border-radius: 4px;

			image {
				width: 100%;
				height: 100%;
				transition: .6s;
				opacity: 0;
				border-radius: 8upx;

				&.loaded {
					opacity: 1;
				}
			}
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $uni-font-size-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $uni-font-size-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $uni-font-size-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.iconshoucang {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.title {
			font-size: $uni-font-size-base;
			margin-left: 10upx;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $uni-font-size-sm;
			color: $uni-color-primary;
		}

		.iconmoreb {
			font-size: $uni-font-size-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.list-section {
		font-size: $uni-font-size-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.sec-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $uni-font-size-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}


	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.eva-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $uni-font-size-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $uni-font-size-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.iconmores {
				margin-left: 10upx;
			}
		}

		.eva-box {
			display: flex;
			padding: 20upx 0;

			.portrait {
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100px;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $uni-font-size-base;
				color: $font-color-base;
				padding-left: 26upx;

				.con {
					font-size: $uni-font-size-base;
					color: $font-color-dark;
					padding: 20upx 0;
				}

				.bot {
					display: flex;
					justify-content: space-between;
					font-size: $uni-font-size-sm;
					color: $font-color-light;
				}
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.desc-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $uni-font-size-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $uni-font-size-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.iconfont {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .iconfont {
				color: $uni-color-primary;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $uni-font-size-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
