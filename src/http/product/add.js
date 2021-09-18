import {request} from "../request";

export function productAdd(data) {
    return request({
        url: '/product',
        method: 'POST',
        data: data,
    });
}