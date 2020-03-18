<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || isEmpty===true" class="empty">
			<image src="/static/emptycart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>

		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.image" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
							 @error="onImageError('cartList', index)"></image>
							<view class="iconfont iconxuanzhong checkbox" :class="{checked: item.checked}" @click="check('item', index)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">{{item.attr_val}}</text>
							<text class="price">¥{{item.price}}</text>
							<number-box class="step" :min="1" :max="item.stock" :value="item.number>item.stock?item.stock:item.number"
							 :isMax="item.number>=item.stock?true:false" :isMin="item.number===1" :index="index" @eventChange="numberChange"></number-box>
						</view>
						<text class="iconfont iconshanchu del-btn" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">清空</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{totalPrice}}</text>
					<text class="coupon">已优惠<text>74.35</text>元</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import numberBox from '@/components/number-box.vue'
	export default {
		///////////////////////////////////////////////////////////////////////////////////////////
		//注册组件
		///////////////////////////////////////////////////////////////////////////////////////////
		components: {
			numberBox
		},
		
		///////////////////////////////////////////////////////////////////////////////////////////
		//数据对象
		///////////////////////////////////////////////////////////////////////////////////////////
		data() {
			return {
				isEmpty: false, //空白页现实  true|false
				allChecked: false, //全选状态  true|false
				cartList: [], //商品列表
				totalPrice: 0, //总价格
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//属性调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		computed: {
			...mapState(['hasLogin'])
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//挂载到实例上去之后调用该钩子
		///////////////////////////////////////////////////////////////////////////////////////////
		mounted: function() {
			console.log('cart mounted');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		///////////////////////////////////////////////////////////////////////////////////////////
		onLoad(option) {
			console.log('cart onLoad');
			this.loadData();
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		///////////////////////////////////////////////////////////////////////////////////////////
		onShow() {
			console.log('cart onShow');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面隐藏
		///////////////////////////////////////////////////////////////////////////////////////////
		onHide() {
			console.log('cart onHide');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//监听页面卸载
		///////////////////////////////////////////////////////////////////////////////////////////
		onUnload() {
			console.log('cart onUnload');
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		// 监听数据变化
		///////////////////////////////////////////////////////////////////////////////////////////
		watch: {
			cartList(newValue, oldValue) {
				let empty = newValue.length === 0 ? true : false;
				this.isEmpty = empty;
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//函数调用,
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {
			//请求数据
			async loadData() {
				let list = await this.$api.json('cartList');
				let cartList = list.map(item => {
					item.checked = true;
					return item;
				});
				this.cartList = cartList;
				this.calcTotal(); //计算总价
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			//选中状态处理
			check(type, index) {
				console.log('check');
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked;
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					});
					this.allChecked = checked;
				}
				this.calcTotal();
			},
			//数量改变
			numberChange(data) {
				console.log('numberChange');
				this.cartList[data.index].number = data.number;
				this.calcTotal();
			},
			//删除购物车
			deleteCartItem(index) {
				console.log('deleteCartItem');
				this.cartList.splice(index, 1);
				this.calcTotal();
			},
			//清空购物车
			clearCart() {
				console.log('clearCart');
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
							this.isEmpty = true;
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				console.log('calcTotal');
				let list = this.cartList;
				if (list.length === 0) {
					this.isEmpty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.number;
					} else if (checked === true) {
						checked = false;
					}
				});
				this.allChecked = checked;
				this.totalPrice = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				console.log('createOrder');
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;
	}

	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}

		.empty-tips {
			display: flex;
			font-size: $uni-font-size-sm+2upx;
			color: $font-color-disabled;

			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
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

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $uni-font-size-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $uni-font-size-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $uni-font-size-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $uni-font-size-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $uni-font-size-lg;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $uni-font-size-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
