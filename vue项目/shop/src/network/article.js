import { request } from './request'

export function getArticle(obj) {
    return request({
        url: '/article',
        params: obj
    })
}