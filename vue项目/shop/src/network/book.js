import { request } from './request'

export function getBooks(obj) {
    return request({
        url: '/books',
        params: obj
    })
}