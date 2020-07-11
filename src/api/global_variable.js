// jianglong
// global_variable.js
// 专门放置 全局变量

//const 声明常量
// const baseHost = "127.0.0.1:8010"
const baseHost = "192.168.11.45:8010"
const baseURL = "http://"+baseHost+"/api"
const errMsg = "操作失败"
const successMsg = "操作成功"
const contentType = "application/json;charset=UTF-8"

// 分组类型，暂不放到数据字典，直接由前端添加
const groups = [
		{ value: 'public_api', label: '公共API接口' },
		{ value: 'external_api', label: '第三方API接口' },
		{ value: 'interior_api', label: '内网API接口' },
		{ value: 'pay_api', label: '支付API接口' },
		{ value: 'other_api', label: '其它API接口' }
	]


//导出全局变量
export default{
	baseHost,
	baseURL,
	contentType,
	errMsg,
	successMsg,
	groups
}


