//apidoc_api.js
import service from './request'

/**
 * 查询网关路由列表
 */
export const apiDocList = data => {
    return service({
        url: '/apiDoc/list',
        method: 'get',
        data
    })
};

/**
 * 保存API接口内容
 */
export const saveApiDoc = data => {
    return service({
        url: '/apiDoc/save',
        method: 'post',
        data
    })
};

/**
 * 查询API接口内容
 */
export const findByApiDoc = data => {
    return service({
        url: '/apiDoc/findById',
        method: 'get',
        data
    })
};