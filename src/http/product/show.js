import {request} from "../request";

export function getProductInfo(id) {

    return request({
        url: '/product/' + id,
        method: 'GET',
    });

}