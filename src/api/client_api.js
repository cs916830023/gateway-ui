//client_api.js
import service from './request'

/**
 * 添加客户端
 */
export const addClient = data => {
    return service({
        url: '/client/add',
        method: 'post',
        data
    })
};

/**
 * 更新客户端
 */
export const updateClient = data => {
    return service({
        url: '/client/update',
        method: 'post',
        data
    })
};

/**
 * 分页查询客户端列表
 */
export const clientPageList = data => {
    return service({
        url: '/client/pageList',
        method: 'post',
        data
    })
};

/**
 * 启用客户端
 */
export const startClient = data => {
    return service({
        url: '/client/start',
        method: 'get',
        data
    })
};

/**
 * 停止客户端
 */
export const stopClient = data => {
    return service({
        url: '/client/stop',
        method: 'get',
        data
    })
};

/**
 * 删除客户端
 */
export const deleteClient = data => {
    return service({
        url: '/client/delete',
        method: 'get',
        data
    })
};
