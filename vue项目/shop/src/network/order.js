import { request } from './request'
export function getOrder(obj) {
    return request({
        url: '/order',
        params: obj
    })
}