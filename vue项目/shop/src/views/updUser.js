import { request } from './request'
import qs from 'qs'
export function UpdUser(user) {
    return request({
        url: '/upduser',
        method: 'post',
        data: qs.stringify(user),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}