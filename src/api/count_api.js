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

