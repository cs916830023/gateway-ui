<template>
	<div>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="20" align="left">
					<el-menu router :default-active="$route.path" mode="horizontal" @select="handleSelect"
					background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">						
						<el-menu-item index="/loadBalanced" class="iconfont icon-jichuguanli">负载管理</el-menu-item>
						<el-menu-item index="/gatewayList" class="el-icon-connection">服务管理</el-menu-item>
						<el-menu-item index="/clientList" class="el-icon-s-custom">客户端管理</el-menu-item>
						<el-menu-item index="/ipList" class="iconfont icon-IP">IP名单管理</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="4" style="line-height: 60px; height: 60px;">
					  <!-- <el-avatar style="float: right; margin-top: 16px;" size="small" icon="el-icon-notebook-2" ></el-avatar> -->
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<!-- 回到顶部 -->
			<template><el-backtop>UP</el-backtop></template>
			<router-view name="mainView" ref="viewPage" v-if="isRouterAlive" />			
		</el-main>
	</el-container>
	</div>
</template>

<script>
	
export default {
	data() {
		return {
			isRouterAlive: true,
			isDisabled: true
		};
	},
	created: function() {		
		
	},
	mounted: function() {
  
	},
	beforeDestroy: function() {

	},
	methods:{
		handleSelect(key, keyPath) {
		}
	}
};
</script>

<style>
html,
body,
#app,
.el-container {
	padding: 0px;
	margin: 0px;
	height: 100%;
}

.el-header {
	/* text-align: right;
	color: #333;
	height: 45px;*/ 
	/* padding: 0; */
	background-color: rgb(84, 92, 100);
}
.el-card {
	border: 1px solid #EBEEF5;
	background-color: rgba(255, 255, 255, 0.2);
	color: #303133;
	transition: .3s;
}
</style>
