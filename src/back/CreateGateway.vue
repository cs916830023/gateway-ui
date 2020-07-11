<template>
	<div>
		<!-- <el-alert title="请正确配置网关路由服务,否则无法正确提供网关路由服务!" type="error" effect="dark" style="margin-bottom: 10px;" /> -->
		<el-page-header @back="goBack" content="网关服务管理"></el-page-header>
		
		
		<!-- <el-row :gutter="20" style="margin-top: 20px;">
			<el-col>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>网关服务</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div>
						<el-form ref="form" :model="form" label-width="80px">
						  <el-form-item label="活动名称">
						    <el-input v-model="form.name"></el-input>
						  </el-form-item>
						  <el-form-item label="活动区域">
						    <el-select v-model="form.region" placeholder="请选择活动区域">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item>
						      <el-button type="primary" @click="onSubmit">立即创建</el-button>
						      <el-button>取消</el-button>
						    </el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row> -->
		
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>网关服务配置</span>
						<!-- <el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button> -->
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-s-release" type="warning" >Cancel</el-button>
						</div>
						<div style="float: right; margin-left: 10px;">
						    <el-button icon="el-icon-s-claim" type="success" >Publish</el-button>
						</div>
					</div>
					<div style="margin-bottom: 10px;">
						<el-row>
							<el-col :span="2">
								&nbsp;
							</el-col>
							<el-col :span="22" style="border: 0px solid red;">
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="200" trigger="click">
									  <el-radio v-model="radio" label="1">启用</el-radio>
									  <el-radio v-model="radio" label="2">禁用</el-radio>
									  <el-button slot="reference">服务状态:启用<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="300" trigger="click">
									  <el-input placeholder="示例：StripPrefix=1" v-model="stripPrefix">
									    <template slot="prepend">StripPrefix=</template>
									  </el-input>
									  <el-button slot="reference" >断言StripPrefix=1<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="500" trigger="click">
									  <el-input placeholder="示例：Path=/route/producer/** 或 /producer/api" v-model="gatewayServer" style="width: 500px;">
									    <template slot="prepend">Path=</template>
									  </el-input>
									  <el-button slot="reference">断言Path=/route/producer/**<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
								  <el-input placeholder="请输入网关服务URL,示例:http://127.0.0.1:8080/route/api.do" v-model="gatewayServer" class="input-with-select" style="width: 520px;">
								    <el-select v-model="alarmStatus" slot="prepend" placeholder="请选择" style="width: 90px;">
								       <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"/>
								    </el-select>
								    <!-- <el-button slot="append" icon="el-icon-search" ></el-button> -->
								  </el-input>
								</div>
								<div style="float: right;">
									<el-input placeholder="示例：producer-api" v-model="gatewayServer">
									  <template slot="prepend">名称</template>
									</el-input>
								</div>
							</el-col>
						</el-row>
					</div>
					<div>
						<el-row>
							<el-col :span="2">
								&nbsp;
							</el-col>
							<el-col :span="22" style="border: 0px solid red;">
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="200" trigger="click">
									  <el-radio v-model="radio" label="1">启用</el-radio>
									  <el-radio v-model="radio" label="2">禁用</el-radio>
									  <el-button slot="reference">服务状态:启用<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="300" trigger="click">
									  <el-input placeholder="示例：StripPrefix=1" v-model="stripPrefix">
									    <template slot="prepend">StripPrefix=</template>
									  </el-input>
									  <el-button slot="reference" >断言StripPrefix=1<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="500" trigger="click">
									  <el-input placeholder="示例：Path=/route/producer/** 或 /producer/api" v-model="gatewayServer" style="width: 500px;">
									    <template slot="prepend">Path=</template>
									  </el-input>
									  <el-button slot="reference">断言Path=/route/producer/**<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
								  <el-input placeholder="请输入网关服务URL,示例:http://127.0.0.1:8080/route/api.do" v-model="gatewayServer" class="input-with-select" style="width: 520px;">
								    <el-select v-model="alarmStatus" slot="prepend" placeholder="请选择" style="width: 90px;">
								       <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"/>
								    </el-select>
								    <!-- <el-button slot="append" icon="el-icon-search" ></el-button> -->
								  </el-input>
								</div>
								<div style="float: right;">
									<el-input placeholder="示例：producer-api" v-model="gatewayServer">
									  <template slot="prepend">名称</template>
									</el-input>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>网关负载配置</span>
						<el-button style="float: right; padding: 3px 0; " icon="el-icon-question" type="text">说明</el-button>
					</div>
					<div>
						<el-row>
							<el-col :span="2">
								&nbsp;
							</el-col>
							<el-col :span="22" style="border: 0px solid red;">
								<div style="float: right; margin-left: 10px;">
								    <el-button icon="el-icon-s-release" type="warning" >Cancel</el-button>
								</div>
								<div style="float: right; margin-left: 10px;">
								    <el-button icon="el-icon-s-claim" type="success" >Publish</el-button>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="200" trigger="click">
									  <el-radio v-model="radio" label="1">启用</el-radio>
									  <el-radio v-model="radio" label="2">禁用</el-radio>
									  <el-button slot="reference">服务状态:启用<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="300" trigger="click">
									  <el-input placeholder="示例：StripPrefix=1" v-model="stripPrefix">
									    <template slot="prepend">StripPrefix=</template>
									  </el-input>
									  <el-button slot="reference" >断言StripPrefix=1<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
									<el-popover placement="bottom" width="500" trigger="click">
									  <el-input placeholder="示例：Path=/route/producer/** 或 /producer/api" v-model="gatewayServer" style="width: 500px;">
									    <template slot="prepend">Path=</template>
									  </el-input>
									  <el-button slot="reference">断言Path=/route/producer/**<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
									</el-popover>
								</div>
								<div style="float: right; margin-left: 10px;">
								  <el-input placeholder="请输入网关服务URL,示例:http://127.0.0.1:8080/route/api.do" v-model="gatewayServer" class="input-with-select" style="width: 520px;">
								    <el-select v-model="alarmStatus" slot="prepend" placeholder="请选择" style="width: 90px;">
								       <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"/>
								    </el-select>
								    <!-- <el-button slot="append" icon="el-icon-search" ></el-button> -->
								  </el-input>
								</div>
								<div style="float: right;">
									<el-input placeholder="示例：producer-api" v-model="gatewayServer">
									  <template slot="prepend">名称</template>
									</el-input>
								</div>
		
							</el-col>
						</el-row>
					</div>
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
					    <div><el-checkbox v-model="filter.ipChecked" @click="filter.ipChecked=filter.ipChecked?false:true">启用</el-checkbox></div>
					    <div>基于IP进行拦截，只有客户端管理中添加对本网关服务连接权限的指定IP才能访问本路由地址。</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    TOKEN过滤&nbsp;&nbsp;<i v-show="filter.tokenChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="filter.tokenChecked" @click="filter.tokenChecked=filter.tokenChecked?false:true">启用</el-checkbox></div>
					    <div>基于TOKEN进行拦截，只有符合指定TOKEN才能访问本路由地址。</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    ID过滤&nbsp;&nbsp;<i v-show="filter.idChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="filter.idChecked" @click="filter.idChecked=filter.idChecked?false:true">启用</el-checkbox></div>
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
					    <div><el-checkbox v-model="hystrix.defaultChecked" @click="hystrix.defaultChecked=hystrix.defaultChecked?false:true">启用</el-checkbox></div>
					    <div>启用超时检测，当请求到响应返回的时间，超过5000ms后，将触发全局Hystrix熔断方法的（name: fallbackcmd），默认回调路径fallbackUri: forward:/fallback。</div>
					  </el-collapse-item>
					  <el-collapse-item title="自定义方法">
						  <template slot="title">
						    自定义方法&nbsp;&nbsp;<i v-show="hystrix.customChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="hystrix.customChecked" @click="hystrix.customChecked=hystrix.customChecked?false:true">启用</el-checkbox></div>
					    <div>启用超时检测，当请求到响应返回的时间，超过自定义时长后，将触发自定义Hystrix熔断方法的（name: testFallbackcmd），默认回调路径fallbackUri: forward:/fallback/custom 。</div>
						<div style="margin-bottom: 5px;">
							<el-input size="small" placeholder="触发fallbackcmd超时时长,如:3000" v-model="gatewayServer">
							  <template slot="prepend">超时时长</template>
							</el-input>
						</div>
						<div style="margin-bottom: 5px;">
							<el-input size="small" placeholder="触发fallbackcmd提示内容,如:system is error" v-model="gatewayServer">
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
								<el-input-number size="small" v-model="burstCapacity" :step="20" :min="0" :max="10000" style="width: 60%;"/>
							</el-col>
						</el-row>
					</div>
					<div style="margin-top: 10px; border: 0px solid red;">
						<el-row :gutter="24">
							<el-col :span="5">
								<span class="text item" style="line-height: 38px;">每秒流量</span>
							</el-col>
							<el-col :span="19">
								<el-slider size="small" v-model="replenishRate" :step="20" :min="0" :max="burstCapacity" show-stops />
							</el-col>
						</el-row>
					</div>
					
					<el-collapse accordion>
					  <el-collapse-item>
					    <template slot="title">
					      IP限流&nbsp;&nbsp;<i v-show="limiter.ipChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.ipChecked" @click="limiter.ipChecked=limiter.ipChecked?false:true">启用</el-checkbox></div>
					    <div>基于令牌桶算法，当访问网关路由URL的请求host主机名数量，超出限流规则的约束，则直接拒决请求。</div>
					  </el-collapse-item>
					  <el-collapse-item title="URI限流">
					    <template slot="title">
					      URI限流&nbsp;&nbsp;<i v-show="limiter.uriChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.uriChecked" @click="limiter.uriChecked=limiter.uriChecked?false:true">启用</el-checkbox></div>
					    <div>基于令牌桶算法，当访问网关路由URL的请求数量，超出限流规则的约束，则直接拒决请求。</div>
					  </el-collapse-item>
					  <el-collapse-item>
					    <template slot="title">
					      REQUESTID限流&nbsp;&nbsp;<i v-show="limiter.idChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
					    </template>
					    <div><el-checkbox v-model="limiter.idChecked" @click="limiter.idChecked=limiter.idChecked?false:true">启用</el-checkbox></div>
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
					    <div><el-checkbox v-model="access.headerChecked" @click="access.headerChecked=access.headerChecked?false:true">启用</el-checkbox></div>
					    <div>获取客户端请求中的所带的HEADER头部信息，验证指定键值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：Accept-Language: zh-CN,zh;q=0.9" v-model="gatewayServer">
							  <template slot="prepend">HEADER</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						    IP验证&nbsp;&nbsp;<i v-show="access.ipChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.ipChecked" @click="access.ipChecked=access.ipChecked?false:true">启用</el-checkbox></div>
					    <div>如果启用IP过滤，则会先执行IP过滤后，再执行本IP验证，不符合验证规则，则直接拒决请求。通常用于临时性IP过滤。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：192.168.1.100,92.168.1.*" v-model="gatewayServer">
							  <template slot="prepend">IP</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
							参数验证&nbsp;&nbsp;<i v-show="access.parmChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.parmChecked" @click="access.parmChecked=access.parmChecked?false:true">启用</el-checkbox></div>
					    <div>获取URL请求串中的所带的参数，验证指定参数值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：token=uuid" v-model="gatewayServer">
							  <template slot="prepend">请求参数</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item>
						  <template slot="title">
						  	时间验证&nbsp;&nbsp;<i v-show="access.timeChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.timeChecked" @click="access.timeChecked=access.timeChecked?false:true">启用</el-checkbox></div>
					    <div>只允许指定时间段内进行访问，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：08:00:00,20:00:00" v-model="gatewayServer">
							  <template slot="prepend">时间</template>
							</el-input>
						</div>
					  </el-collapse-item>
					  <el-collapse-item title="Cookie验证">
						  <template slot="title">
						  	Cookie验证&nbsp;&nbsp;<i v-show="access.cookieChecked" class="header-icon el-icon-success" style="color: #34bfa3; font-size: 12pt;"></i>
						  </template>
					    <div><el-checkbox v-model="access.cookieChecked" @click="access.cookieChecked=access.cookieChecked?false:true">启用</el-checkbox></div>
					    <div>获取客户端请求所带的cookie信息，验证指定cookie参数值，不符合验证规则，则直接拒决请求。</div>
						<div style="margin-top: 10px;">
							<el-input size="small" placeholder="示例：name=value" v-model="gatewayServer">
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
	export default {
		data() {
			return {
				input4:'',
				checked:false,
				form:{},
				radio: '1',
				stripPrefix: '',
				replenishRate:10,
				burstCapacity:100,
				filter:{
					ipChecked: false,
					tokenChecked: false,
					idChecked: false
				},
				hystrix:{
					defaultChecked: false,
					customChecked: false,
				},
				limiter:{
					ipChecked: false,
					uriChecked: false,
					idChecked: false
				},
				access:{
					headerChecked: false,
					ipChecked: false,
					parmChecked: false,
					timeChecked: false,
				    cookieChecked: false
				},
				options: [
					{value: null, label: '所有'},
					{value: '0',label: '启用'}, 
					{value: '1',label: '禁用'},
				],
				methodOptions: [
					{value: null, label: 'ALL'},
					{value: 'POST',label: 'POST'}, 
					{value: 'GET',label: 'GET'},
					{value: 'PUT',label: 'PUT'},
					{value: 'DELETE',label: 'DELETE'},
				],
				gridData: [{
				  date: '2016-05-02',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-04',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-01',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-03',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}]
			};
		},
		created: function() {
			
		},
		mounted: function() {
		
		},
		beforeDestroy: function() {
			
		},
		methods:{
			init() {
			
			},
			goBack() {
			    console.log('go back');
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
