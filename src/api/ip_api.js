//ip_api.js
import service from './request'


/**
 * 添加网关路由服务
 */
export const addIp = data => {
    return service({
        url: '/ip/add',
        method: 'post',
        data
    })
};

/**
 * 添加网关路由服务
 */
export const updateIp = data => {
    return service({
        url: '/ip/update',
        method: 'post',
        data
    })
};

/**
 * 查询网关路由列表
 */
export const ipPageList = data => {
    return service({
        url: '/ip/pageList',
        method: 'post',
        data
    })
};

/**
 * 删除网关路由
 */
export const deleteIp = data => {
    return service({
        url: '/ip/delete',
        method: 'get',
        data
    })
};
