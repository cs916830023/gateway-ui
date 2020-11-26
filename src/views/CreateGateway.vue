<template>
	<div>
		<el-page-header @back="goBack" content="服务管理"></el-page-header>
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>网关路由》服务配置</span>
						<el-popover trigger="click" placement="bottom">
							<div style="font-size: 10pt;">
								<span>配置说明：</span><br/>
								<span>1.服务URL，支持http、https、server-id(lb://xxx)模式转发。</span><br/>
								<span>2.断言Path，请根据实际API调用路径设置，不含服务host和port，可添加自定义前缀。</span><br/>
								<span>3.断言StripPrefix根据值，截取断言Path多节斜杠后内容，拼接到服务URL上。</span><br/>
								<span>4.服务URL示例：http://server:port、http://server.com、lb://xxx ,支持但不推荐：http://server:port/api.do。</span><br/>
								<span>5.断言Path示例：/route/producer/** 或 /producer/api" 。</span>
							</div>
							<el-button slot="reference" style="padding: 3px 0; " icon="el-icon-question" type="text" title="说明"></el-button>
						</el-popover>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-delete" size="mini" type="warning" @click="resetForm"> 清 空 </el-button>
						</div>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-s-claim" size="mini" type="success" @click="submit"> 发 布 </el-button>
						</div>
					</div>	
					
					<el-row>
						<el-col :span="24">
							<div style="float: left;">
								<el-input placeholder="示例：project-method" v-model="form.id" style="width: 343px;" :disabled="idDisabled">
								  <template slot="prepend">RouteId</template>
								</el-input>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-input placeholder="示例：CRM-用户信息获取网关" v-model="form.name" style="width: 343px;">
								  <template slot="prepend">名称</template>
								</el-input>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-popover placement="bottom" width="170" trigger="click">
								  <el-radio v-model="form.status" label="0">启用</el-radio>
								  <el-radio v-model="form.status" label="1">禁用</el-radio>
								  <el-button slot="reference">服务状态:{{form.status === '0'?'启用':'禁用'}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
								</el-popover>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-popover placement="bottom" width="450" trigger="click">
								  <el-input placeholder="示例：RequestParameter=version,v01" v-model="form.requestParameter" >
									<template slot="prepend">RequestParameter=</template>
								  </el-input>
								  <el-button slot="reference">请求参数RequestParameter={{form.requestParameter}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
								</el-popover>
							</div>
						</el-col>
					</el-row>
					
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<div style="float: left;">
							  <el-input placeholder="请输入网关服务URL,示例:http://server:port、http://server.com、lb://xxx" v-model="form.uri" class="input-with-select" style="width: 800px;">
								<el-select v-model="form.method" slot="prepend" placeholder="请选择" style="width: 90px;">
								   <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"/>
								</el-select>
							  </el-input>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-popover placement="bottom" width="500" trigger="click">
								  <el-input placeholder="示例：Path=/route/producer/** 或 /producer/api" v-model="form.path" style="width: 500px;">
									<template slot="prepend">Path=</template>
								  </el-input>
								  <el-button slot="reference">断言Path={{form.path}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
								</el-popover>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-popover placement="bottom" width="300" trigger="click">
								  <el-input placeholder="示例：StripPrefix=1" v-model="form.stripPrefix">
									<template slot="prepend">StripPrefix=</template>
								  </el-input>
								  <el-button slot="reference" >断言StripPrefix={{form.stripPrefix}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
								</el-popover>
							</div>
							<div style="float: left; margin-left: 10px;">
								<el-popover placement="bottom" trigger="click">
								  <!-- <el-radio v-model="form.groupCode" v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" @change=""></el-radio> -->
								  <el-radio-group v-model="form.groupCode" size="mini" @change="handleSelectedGroup">
									  <el-radio-button v-for="item in groupOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
								  </el-radio-group>
								  <el-button slot="reference">分组:{{groupName}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
								</el-popover>
							</div>
						</el-col>			
					</el-row>
					
				</el-card>
			</el-col>
		</el-row>
		
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>过滤器</span>
						<el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button>
					</div>
					<el-collapse accordion>
					  <el-collapse-item>
					    <template slot="title">
					      IP过滤&nbsp;&nbsp;<i v-show="filter.ipChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="filter.ipChecked">启用</el-checkbox></div>
					    <div>基于IP进行拦截，只有客户端管理中添加对本网关服务连接权限的指定IP才能访问本路由地址。</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    TOKEN过滤&nbsp;&nbsp;<i v-show="filter.tokenChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="filter.tokenChecked">启用</el-checkbox></div>
					    <div>基于TOKEN进行拦截，只有符合指定TOKEN才能访问本路由地址。</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    ID过滤&nbsp;&nbsp;<i v-show="filter.idChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="filter.idChecked">启用</el-checkbox></div>
					    <div>基于ID进行拦截，只有符合指定ID才能访问本路由地址。</div>
					  </el-collapse-item>
					</el-collapse>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>熔断器</span>
						<el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button>
					</div>
					<el-collapse accordion>
					  <el-collapse-item>
					    <template slot="title">
					      全局方法&nbsp;&nbsp;<i v-show="hystrix.defaultChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="hystrix.defaultChecked" @change="handleHystrixChecked('default')">启用</el-checkbox></div>
					    <div>启用超时检测，当请求到响应返回的时间，超过5000ms后，将触发全局Hystrix熔断方法的（name: fallbackcmd），默认回调路径fallbackUri: forward:/fallback。</div>
					  </el-collapse-item>
					  <el-collapse-item title="自定义方法">
						  <template slot="title">
						    自定义方法&nbsp;&nbsp;<i v-show="hystrix.customChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="hystrix.customChecked" @change="handleHystrixChecked('custom')">启用</el-checkbox></div>
					    <div>启用超时检测，当请求到响应返回的时间，超过自定义时长后，将触发自定义Hystrix熔断方法（name: customHystrix_no），默认回调路径fallbackUri: forward:/fallback/custom 。(如无特殊要求，<span style="font-weight: bold;">强列建议用默认全局Hystrix方法</span>，过多定制Hystrix否则会增加gateway网关服务性能压力)</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="触发fallbackcmd超时时长,如:3000" v-model="form.fallbackTimeout">
							  <template slot="prepend">超时时长</template>
							</el-input>
						</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="触发fallbackcmd提示内容,如:system is error" v-model="form.fallbackMsg">
							  <template slot="prepend">提示内容</template>
							</el-input>
						</div>
					  </el-collapse-item>
					</el-collapse>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>限流器</span>
						<el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button>
					</div>
					<div style="margin-top: 10px;">
						<el-row :gutter="24">
							<el-col :span="5">
								<span class="text item" style="line-height: 38px;">令牌总量</span>
							</el-col>
							<el-col :span="19">
								<el-input-number size="small" v-model="form.burstCapacity" :step="20" :min="0" :max="10000" style="width: 60%;"/>
							</el-col>
						</el-row>
					</div>
					<div style="margin-bottom: 10px; border: 0px solid red;">
						<el-row :gutter="24">
							<el-col :span="5">
								<span class="text item" style="line-height: 38px;">每秒流量</span>
							</el-col>
							<el-col :span="19">
								<el-slider size="small" v-model="form.replenishRate" :step="1" :min="0" :max="form.burstCapacity" show-stops />
							</el-col>
						</el-row>
					</div>
					
					<el-collapse accordion>
					  <el-collapse-item>
					    <template slot="title">
					      IP限流&nbsp;&nbsp;<i v-show="limiter.ipChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.ipChecked" @change="handleLimiterChecked('ip')">启用</el-checkbox></div>
					    <div>基于令牌桶算法，当访问网关路由URL的请求host主机名数量，超出限流规则的约束，则直接拒决请求。</div>
					  </el-collapse-item>
					  <el-collapse-item title="URI限流">
					    <template slot="title">
					      URI限流&nbsp;&nbsp;<i v-show="limiter.uriChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.uriChecked" @change="handleLimiterChecked('uri')">启用</el-checkbox></div>
					    <div>基于令牌桶算法，当访问网关路由URL的请求数量，超出限流规则的约束，则直接拒决请求。</div>
					  </el-collapse-item>
					  <el-collapse-item>
					    <template slot="title">
					      REQUESTID限流&nbsp;&nbsp;<i v-show="limiter.idChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.idChecked" @change="handleLimiterChecked('id')">启用</el-checkbox></div>
					    <div>基于令牌桶算法，当访问网关路由URL的RequestId（从请求参数中获取）数量，超出限流规则的约束，则直接拒决请求。</div>
					  </el-collapse-item>
					</el-collapse>
				</el-card>
				
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>鉴权器</span>
						<el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button>
					</div>
					<el-collapse accordion>
					  <el-collapse-item>
					    <template slot="title">
					      HEADER验证&nbsp;&nbsp;<i v-show="access.headerChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="access.headerChecked">启用</el-checkbox></div>
					    <div>获取客户端请求中的所带的HEADER头部信息，验证指定键值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：Accept-Language: zh-CN,zh;q=0.9" v-model="form.accessHeader">
							  <template slot="prepend">HEADER</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    IP验证&nbsp;&nbsp;<i v-show="access.ipChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.ipChecked">启用</el-checkbox></div>
					    <div>如果启用IP过滤，则会先执行IP过滤后，再执行本IP验证，不符合验证规则，则直接拒决请求。通常用于临时性IP过滤。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：192.168.1.100,92.168.1.*" v-model="form.accessIp">
							  <template slot="prepend">IP</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
							参数验证&nbsp;&nbsp;<i v-show="access.parameterChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.parameterChecked">启用</el-checkbox></div>
					    <div>获取URL请求串中的所带的参数，验证指定参数值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：token=uuid" v-model="form.accessParameter">
							  <template slot="prepend">请求参数</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						  	时间验证&nbsp;&nbsp;<i v-show="access.timeChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.timeChecked">启用</el-checkbox></div>
					    <div>只允许指定时间段内进行访问，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：08:00:00,20:00:00" v-model="form.accessTime">
							  <template slot="prepend">时间</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item title="Cookie验证">
						  <template slot="title">
						  	Cookie验证&nbsp;&nbsp;<i v-show="access.cookieChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.cookieChecked">启用</el-checkbox></div>
					    <div>获取客户端请求所带的cookie信息，验证指定cookie参数值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：name=value" v-model="form.accessCookie">
							  <template slot="prepend">Cookie</template>
							</el-input>
						</div>
					  </el-collapse-item>
					</el-collapse>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	// import gatewayJson from '../api/json/gateway.json'
	import {addRoute,updateRoute} from '../api/gateway_api.js'
	
	export default {
		data() {
			return {
				form:{
					name:'',
					id:'',
					stripPrefix:'',
					status:'1',
					uri:'',
					method:'',
					path:'',
					requestParameter:'',
					accessHeader:'',
					accessIp:'',
					accessParameter:'',
					accessTime:'',
					accessCookie:'',
					fallbackMsg:'',
					fallbackTimeout:0,
					replenishRate:20,
					burstCapacity:100,
					groupCode:''
				},			
				filter:{
					ipChecked: false,
					tokenChecked: false,
					idChecked: false
				},
				hystrix:{
					defaultChecked: false,
					customChecked: false
				},
				limiter:{
					ipChecked: false,
					uriChecked: false,
					idChecked: false
				},
				access:{
					headerChecked: false,
					ipChecked: false,
					parameterChecked: false,
					timeChecked: false,
					cookieChecked: false
				},
				handleType: 'add',
				idDisabled: false,
				methodOptions: [
					{value: null, label: 'ALL'},
					{value: 'POST',label: 'POST'}, 
					{value: 'GET',label: 'GET'},
					{value: 'PUT',label: 'PUT'},
					{value: 'DELETE',label: 'DELETE'},
				],
				groupName:'',
				groupOptions: this.GLOBAL_VAR.groups
			}
		},
		created: function() {
			//在组件创建完毕后加载
			let query = this.$route.query;
			if (query){
				this.handleType = query.handleType;
				if (this.handleType === 'edit'){
					let route = query.route;
					console.log('route', route);
					this.init(route);
				}
			}
		},
		mounted: function() {
		
		},
		beforeDestroy: function() {
			
		},
		methods:{
			init(route) {
				if (route && route.form){
					this.form = route.form;
					this.filter = route.filter;
					this.hystrix = route.hystrix;
					this.limiter = route.limiter;
					this.access = route.access;
					this.idDisabled = true;
					this.handleSelectedGroup(this.form.groupCode);
				}
			},
			goBack() {
				this.$router.push({path:'/gatewayList',query:{}});
			},
			handleHystrixChecked(type){//熔断器，二选一
				this.hystrix.defaultChecked = (this.hystrix.defaultChecked && type === 'default')?true:false;
				this.hystrix.customChecked = (this.hystrix.customChecked && type === 'custom')?true:false;
			},
			handleLimiterChecked(type){//限流器，三选一
				this.limiter.ipChecked = (this.limiter.ipChecked && type === 'ip')?true:false;
				this.limiter.uriChecked = (this.limiter.uriChecked && type === 'uri')?true:false;
				this.limiter.idChecked = (this.limiter.idChecked && type === 'id')?true:false;
			},
			handleSelectedGroup(val){
				console.log(val)
				let size = this.groupOptions.length;
				for (var i=0;i <size; i++){
					if (this.groupOptions[i].value === val){
						this.groupName = this.groupOptions[i].label;
						break;
					}
				}
			},
			submit(){
				let data = {form:this.form, filter:this.filter, hystrix:this.hystrix, limiter:this.limiter, access:this.access};
				console.log(data);
				console.log(JSON.stringify(data))
				let _this = this;
				if (this.handleType === 'edit'){
					updateRoute(data).then(function(result){
						console.log(result);
						_this.GLOBAL_FUN.successMsg();
					});
				} else {
					addRoute(data).then(function(result){
						_this.GLOBAL_FUN.successMsg();
					});
				}
			},
			resetForm() {
				this.form = {
					id: this.handleType === 'edit'?this.form.id:null,
					name: null,
					stripPrefix:'',
					status:'1',
					uri:null,
					method:null,
					path:null,
					requestParameter:null,
					accessHeader:null,
					accessIp:null,
					accessParameter:null,
					accessTime:'',
					accessCookie:null,
					fallbackMsg:null,
					fallbackTimeout:0,
					replenishRate:20,
					burstCapacity:100,
				}
				this.filter={}
				this.limiter={}
				this.hystrix={}
				this.access={}
			}
		}
	}
</script>

<style>
.text {
	font-size: 14px;
}
.item {
	margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}
.clearfix:after {
	clear: both;
}
</style>
