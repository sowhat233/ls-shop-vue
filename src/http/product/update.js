import {request} from "../request";

export function productUpdate(data, product_id) {
    return request({
        url: '/product/' + product_id,
        method: 'PATCH',
        data: data,
    });
}