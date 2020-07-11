//sys_api.js
import service from './request'


/**
 * 添加字典组
 */
export const getGateWayInfo = data => {
    return service({
        url: '',
        method: 'post',
		headers: {'Content-type': 'multipart/form-data'},
        data
    })
};


/**
 * 添加网关路由服务
 */
export const addRoute = data => {
    return service({
        url: '/route/add',
        method: 'post',
        data
    })
};

/**
 * 添加网关路由服务
 */
export const updateRoute = data => {
    return service({
        url: '/route/update',
        method: 'post',
        data
    })
};

/**
 * 查询网关路由列表
 */
export const routePageList = data => {
    return service({
        url: '/route/pageList',
        method: 'post',
        data
    })
};

/**
 * 启用网关路由
 */
export const startRoute = data => {
    return service({
        url: '/route/start',
        method: 'get',
        data
    })
};

/**
 * 停止网关路由
 */
export const stopRoute = data => {
    return service({
        url: '/route/stop',
        method: 'get',
        data
    })
};

/**
 * 删除网关路由
 */
export const deleteRoute = data => {
    return service({
        url: '/route/delete',
        method: 'get',
        data
    })
};
