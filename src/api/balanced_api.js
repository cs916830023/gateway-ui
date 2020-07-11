//balanced_api.js
import service from './request'

/**
 * 添加负载配置
 */
export const addBalanced = data => {
    return service({
        url: '/balanced/add',
        method: 'post',
        data
    })
};

/**
 * 删除负载配置
 */
export const deleteBalanced = data => {
    return service({
        url: '/balanced/delete',
        method: 'get',
        data
    })
};

/**
 * 更新负载配置
 */
export const updateBalanced = data => {
    return service({
        url: '/balanced/update',
        method: 'post',
        data
    })
};

/**
 * 查找负载配置
 */
export const findByBalanced = data => {
    return service({
        url: '/balanced/findById',
        method: 'get',
        data
    })
};


/**
 * 分页展示负载配置
 */
export const balancedPageList = data => {
    return service({
        url: '/balanced/pageList',
        method: 'post',
        data
    })
};

/**
 * 启用负载服务
 */
export const startBalanced = data => {
    return service({
        url: '/balanced/start',
        method: 'get',
        data
    })
};

/**
 * 禁用负载服务
 */
export const stopBalanced = data => {
    return service({
        url: '/balanced/stop',
        method: 'get',
        data
    })
};

/**
 * 已注册负载服务
 */
export const loadServerRegList = data => {
    return service({
        url: '/loadServer/regList',
        method: 'post',
        data
    })
};

/**
 * 未注册负载服务
 */
export const loadServerNotRegList = data => {
    return service({
        url: '/loadServer/notRegPageList',
        method: 'post',
        data
    })
};
