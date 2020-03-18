<template>
	<view class="popup" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">

		<view class="mask"></view>

		<view class="layer attr-content" @click.stop="stopPrevent">
			<view class="a-t">
				<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
				<view class="right">
					<text class="price">¥328.00</text>
					<text class="stock">库存：188件</text>
					<view class="selected">
						已选：
						<text class="selected-text" v-for="(sItem, sIndex) in selected" :key="sIndex">
							{{sItem.name}}
						</text>
					</view>
				</view>
			</view>

			<view v-for="(item,index) in specList" :key="index" class="attr-list">
				<text>{{item.name}}</text>
				<view class="item-list">
					<text v-for="(subItem, subIndex) in specItem" v-if="subItem.pid === item.id" :key="subIndex" class="tit" :class="{selected: subItem.selected}"
					 @click="selectSpec(subIndex, subItem.pid)">
						{{subItem.name}}
					</text>
				</view>
			</view>

			<button class="btn" @click="toggleSpec">完成</button>
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
				specClass: 'none',
				selected: [],
				specList: [{
						id: 1,
						name: '尺寸',
					},
					{
						id: 2,
						name: '颜色',
					},
				],
				specItem: [{
						id: 1,
						pid: 1,
						name: 'XS',
					},
					{
						id: 2,
						pid: 1,
						name: 'S',
					},
					{
						id: 3,
						pid: 1,
						name: 'M',
					},
					{
						id: 4,
						pid: 1,
						name: 'L',
					},
					{
						id: 5,
						pid: 1,
						name: 'XL',
					},
					{
						id: 6,
						pid: 1,
						name: 'XXL',
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
					},
				]
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始
		///////////////////////////////////////////////////////////////////////////////////////////
		created() {
			var that = this;

			//规格 默认选中第一条
			this.specList.forEach(item => {
				for (let cItem of this.specItem) {
					if (cItem.pid === item.id) {
						this.$set(cItem, 'selected', true);
						this.selected.push(cItem);
						break; //forEach不能使用break
					}
				}
			});

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
		// 监听数据变化
		///////////////////////////////////////////////////////////////////////////////////////////
		watch: {
			selected(newValue, oldValue) {
				this.$emit('onselected', newValue);
			}
		},

		///////////////////////////////////////////////////////////////////////////////////////////
		//事件函数
		///////////////////////////////////////////////////////////////////////////////////////////
		methods: {
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specItem;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item,'selected',false);
					}
				});
				this.$set(list[index],'selected',true);
				//存储已选择
				this.selected = [];
				list.forEach(item=>{
					if(item.selected === true) {
						this.selected.push(item);
					}
				});				
			},
			//
			stopPrevent() {},
		},
	}
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $uni-font-size-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $uni-font-size-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $uni-font-size-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $uni-font-size-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $uni-font-size-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
</style>
