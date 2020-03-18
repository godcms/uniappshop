///////////////////////////////////////////////////////////////////////////////////////////////////
//主组件，所有页面都是在App.vue下进行切换的，是页面入口文件。
///////////////////////////////////////////////////////////////////////////////////////////////////

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.setTabBarBadge({
			index: 2,
			text: '1000'
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import "style/app.css";
</style>
