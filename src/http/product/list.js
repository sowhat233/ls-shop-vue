import {request} from "../request";

export function getProductList(params) {

    return request({
        url: '/product',
        method: 'GET',
        params: params,
    });

}