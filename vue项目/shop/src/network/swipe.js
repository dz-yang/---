import { request } from './request'

export function getSwipes() {
    return request({
        url: '/swipes',

    })
}