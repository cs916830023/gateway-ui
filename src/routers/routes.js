import Main from '../views/Main.vue'
import GatewayList from '../views/GatewayList.vue'
import CreateGateway from '../views/CreateGateway.vue'
import ClientList from '../views/ClientList.vue'
import CreateClient from '../views/CreateClient.vue'
import IpList from '../views/IpList.vue'
import AddGatewayClient from '../views/AddGatewayClient.vue'
import AddClientGateway from '../views/AddClientGateway.vue'
import GatewayTopology from '../views/GatewayTopology.vue'
import LoadBalanced from '../views/LoadBalanced.vue'
import CreateBalanced from '../views/CreateBalanced.vue'
import ApiDoc from '../views/ApiDoc.vue'
import ApiCount from '../views/ApiCount.vue'

let routes = [
	{
	    path: '/',
		redirect: to => { //重定向
			return '/main'
		}
	}, 
	{
	    path: '/main',
	    component: Main,
	    name: '主页',
	    hidden: true,
		children:[
			{
			    path: '/loadBalanced',
			    name: '负载均衡管理',
			    hidden: true,
				components: {
					mainView: LoadBalanced
				}
			}, 
			{
			    path: '/gatewayList',
			    name: '网关服务管理',
			    hidden: true,
				components: {
					mainView: GatewayList
				}
			}, 
			{
			    path: '/clientList',
			    name: '客户端管理',
			    hidden: true,
				components: {
					mainView: ClientList
				}
			}, 
			{
			    path: '/createGateway',
			    name: '创建网关服务',
			    hidden: true,
				components: {
					mainView: CreateGateway
				}
			}, 
			{
			    path: '/gatewayTopology',
			    name: '网关路由拓扑结构',
			    hidden: true,
				components: {
					mainView: GatewayTopology
				}
			}, 
			{
			    path: '/ipList',
			    name: 'IP名单管理',
			    hidden: true,
				components: {
					mainView: IpList
				}
			},
			{
			    path: '/createClient',
			    name: '创建客户端',
			    hidden: true,
				components: {
					mainView: CreateClient
				}
			},
			{
			    path: '/addGatewayClient',
			    name: '添加网关客户端',
			    hidden: true,
				components: {
					mainView: AddGatewayClient
				}
			},
			{
			    path: '/addClientGateway',
			    name: '添加客户端网关',
			    hidden: true,
				components: {
					mainView: AddClientGateway
				}
			},
			{
			    path: '/createBalanced',
			    name: '创建负载均衡',
			    hidden: true,
				components: {
					mainView: CreateBalanced
				}
			},
			{
			    path: '/apiDoc',
			    name: '接口文档',
			    hidden: true,
				components: {
					mainView: ApiDoc
				}
			},
			{
			    path: '/apiCount',
			    name: '接口统计',
			    hidden: true,
				components: {
					mainView: ApiCount
				}
			},
		]
	}, 
	
];

export default routes;