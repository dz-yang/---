import { request } from './request'
export function getComment(obj) {
    return request({
        url: '/comment',
        params: obj
    })
}