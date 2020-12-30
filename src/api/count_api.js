//count_api.js
import service from './request'

/**
 * 统计网关路由请求量
 */
export const countRequest = data => {
    return service({
        url: '/count/request',
        method: 'post',
		loading: false,
        data
    })
};

/**
 * 统计负载网关路由请求量
 */
export const countBalancedRequest = data => {
    return service({
        url: '/count/balanced/request',
        method: 'post',
		loading: false,
        data
    })
};

/**
 * 获取网关路由集合
 */
export const countRoutePageList = data => {
    return service({
        url: '/count/route/pageList',
        method: 'post',
		loading: false,
        data
    })
};

/**
 * 统计按7天和按24小时维度计算的请求总量
 */
export const countRequestTotal = data => {
    return service({
        url: '/count/request/total',
        method: 'post',
		loading: false,
        data
    })
};