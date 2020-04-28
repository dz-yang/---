import { request } from './request'

export function getUser(obj) {
    return request({
        url: '/user',
        params: obj
    })
}