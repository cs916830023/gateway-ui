<template>
	<div>
		<el-page-header @back="goBack" content="已注册客户端管理"></el-page-header>
		<el-dialog title="添加客户端" :visible.sync="dialogFormVisible" width="38%" :close-on-click-modal="false">
			<el-table size="mini" :data="clientTableData"KEYstyle="width: 100%">
				<el-table-column label="注册KEY" width="280">
					<template slot-scope="scope">
						<el-tag size="small" type="warning" style="font-weight: bold;">{{scope.row.id}}</el-tag>
					</template>
				</el-table-column>	
				<el-table-column label="分组" width="120">
					<template slot-scope="scope">
						<el-tag v-for="group in groupOptions" :key="group.value" v-if="(group.value === scope.row.groupCode)" size="small" type="">{{group.label}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name"></el-table-column>
				<el-table-column label="IP地址" prop="ip"></el-table-column>
				<el-table-column label="操作" width="60">
					<template slot-scope="scope">
						<el-button size="mini" circle icon="el-icon-plus" type="success" title="添加" @click="handleAddRegClient(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="margin-top: 20px;">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="clientCurrentPage"
					:page-sizes="[10,  30, 50]"
					:page-size="clientPageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="clientTotalNum">
				</el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="small">关 闭</el-button>
			</div>
		</el-dialog>
		
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>网关客户端</span>
						<el-popover trigger="click" placement="bottom">
							<div style="font-size: 10pt;">
								<span>添加客户端说明：</span><br/>
								<span>1. 开启路由服务IP过滤后，默认只有已注册到当前服务的客户端才有权限访问。</span><br/>
								<span>2. 新添加的客户端，默认为禁止访问路由服务，请手动开启允许访问，才能生效。</span><br/>
							</div>
							<el-button slot="reference" style="padding: 3px 0; " icon="el-icon-question" type="text" title="说明"></el-button>
						</el-popover>
						<span style="margin-left: 50px;">
							<i class="el-icon-connection"></i>
							<span style="font-size: 11pt;">
								<el-tag size="mini" style="font-weight: bold;">{{form.name}}</el-tag> - 
								<el-tag size="mini" type="warning" style="font-weight: bold;">{{form.id}}</el-tag> - 
								<el-tag size="mini" type="success" style="font-weight: bold;">{{form.uri}}</el-tag>
							</span>
						</span>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-circle-plus-outline" size="small" type="success" @click="search" title="查找客户端">添加客户端</el-button>
						</div>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-s-claim" size="small" type="primary" @click="startAll" title="启用所有客户端通行">全部允许</el-button>
						</div>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-circle-close" size="small" type="danger" @click="stopAll" title="禁用所有客户端通行">全部禁止</el-button>
						</div>
					</div>
					
					<el-table :data="tableData" style="width: 100%">
						<el-table-column label="注册KEY(系统生成)" width="290">
							<template slot-scope="scope">
								<el-tag size="small" type="warning" style="font-weight: bold;">{{scope.row.id}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="分组">
							<template slot-scope="scope">
								<!-- <el-tag size="small" type="">{{scope.row.groupCode}}</el-tag> -->
								<el-tag v-for="group in groupOptions" :key="group.value" v-if="(group.value === scope.row.groupCode)" size="small" type="">{{group.label}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="名称" prop="name"></el-table-column>
						<el-table-column label="IP地址" prop="ip"></el-table-column>
						<el-table-column label="状态" prop="status" :formatter="formatterStatus">
							<template slot-scope="scope">
								<div v-if="scope.row.regServerStatus==='0'"><i class="el-icon-success" style="color: #409EFF;"></i>&nbsp;<el-tag size="mini">{{'允许通行'}}</el-tag></div>
								<div v-if="scope.row.regServerStatus==='1'"><i class="el-icon-error" style="color: #f00000;"></i>&nbsp;<el-tag size="mini" type="danger">{{'禁止通行'}}</el-tag></div>
							</template>
						</el-table-column>
						<el-table-column label="注册时间" prop="regServerTime"></el-table-column>
						<el-table-column label="备注" prop="remarks"></el-table-column>						
						<el-table-column label="操作" width="100">
							<template slot-scope="scope">
								 <el-dropdown trigger="click" @command="handleCommandRegClient">
									<el-button size="mini" circle icon="el-icon-setting" title="设置" style="border: 0px;"></el-button>
								  <el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{command:'start', row: scope.row}"><i class="el-icon-success" style="color: #409EFF;"></i>允许通行</el-dropdown-item>
									<el-dropdown-item :command="{command:'stop', row: scope.row}"><i class="el-icon-error" style="color: red;"></i>禁止通行</el-dropdown-item>
									<el-dropdown-item :command="{command:'delete', row: scope.row}" divided><i class="el-icon-delete"></i>移除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" style="margin-top: 20px;">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[10,  30, 50]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="totalNum"
						></el-pagination>
					</div>
					
				</el-card>
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import {addRegClient,regClientPageList,startRegClient,stopRegClient,deleteRegClient,startAllRegClient,stopAllRegClient,notRegClientPageList} from '../api/regserver_api.js'
	
	export default {
		data() {
			return {
				dialogFormVisible: false,
				form:{},
				tableData: [{
				}],
				currentPage: 1,
				pageSize: 10,
				totalNum: 0,
				clientTableData: [{
				}],
				clientCurrentPage: 1,
				clientPageSize: 10,
				clientTotalNum:0,
				groupOptions: this.GLOBAL_VAR.groups
			};
		},
		created: function() {
			//在组件创建完毕后加载
			let query = this.$route.query;
			if (query){
				let route = query.route;
				console.log('route', route);
				this.init(route);
			}
		},
		mounted: function() {
		
		},
		beforeDestroy: function() {
			
		},
		methods:{
			init(route) {
				this.form = route.form;
				this.regClientList();
			},
			goBack() {
			    console.log('go back');
				this.$router.push({path:'/gatewayList',query:{}});
			},
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			handleShowInfo(row, index){
				this.infoForm = row;
			},
			formatterStatus(row, index){
				return "允许通行"
			},
			handleCommandRegClient(obj){
				console.log("command" , obj);
				let _this = this;
				if (obj.command === 'start'){
					this.$confirm('确认允许当前客户端"'+obj.row.name+'"访问该注册服务？').then(_ => {
						startRegClient({id:obj.row.regServerId}).then(function(result){
							_this.GLOBAL_FUN.successMsg();
							_this.regClientList();
						});
					}).catch(_ => {});
				} else if (obj.command === 'stop'){
					this.$confirm('确认禁止当前客户端"'+obj.row.name+'"访问该注册服务？').then(_ => {
						stopRegClient({id:obj.row.regServerId}).then(function(result){
							_this.GLOBAL_FUN.successMsg();
							_this.regClientList();
						});
					}).catch(_ => {});
				} else if (obj.command === 'delete'){
					this.$confirm('确认删除客户端"'+obj.row.name+'"注册该服务？').then(_ => {
						deleteRegClient({id:obj.row.regServerId}).then(function(result){
							_this.GLOBAL_FUN.successMsg();
							_this.regClientList();
						})
					}).catch(_ => {});
				}
			},
			handleAddRegClient(row){
				let _this = this;
				addRegClient({clientId: row.id, routeId: this.form.id}).then(function(result){
					_this.GLOBAL_FUN.successMsg();
					_this.regClientList();
					_this.clientList();
				});
			},
			startAll(){
				let _this = this;
				this.$confirm('确认要允许当前服务下所有已注册的客户端访问？').then(_ => {
					startAllRegClient({routeId: _this.form.id,}).then(function(result){
						_this.GLOBAL_FUN.successMsg();
						_this.regClientList();
					});
				}).catch(_ => {});
			},
			stopAll(){
				let _this = this;
				this.$confirm('确认要禁止当前服务下所有已注册客户端访问？').then(_ => {
					stopAllRegClient({routeId: _this.form.id,}).then(function(result){
						_this.GLOBAL_FUN.successMsg();
						_this.regClientList();
					});
				}).catch(_ => {});
			},
			regClientList(){
				let _this = this;
				regClientPageList({routeId: this.form.id, currentPage: this.currentPage, pageSize: this.pageSize}).then(function(result){
					if (result.data){
						_this.tableData = result.data.lists;
						_this.totalNum = result.data.totalNum;
					}
				})
			},
			clientList(){
				let _this = this;
				notRegClientPageList({routeId: this.form.id, currentPage: this.clientCurrentPage, pageSize: this.clientPageSize}).then(function(result){
					console.log(result);
					if (result.data && result.data.lists){
						_this.clientTableData = result.data.lists;
						_this.clientTotalNum = result.data.totalNum;
					}
				});
			},
			search(){
				this.dialogFormVisible = true;
				this.clientList();
			}
		}
	}
</script>

<style>
	.el-icon-setting:before {
	    content: "\E6CA";
	    font-size: 12pt;
	}
</style>
