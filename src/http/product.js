import {request} from "./request";

export function productAdd(data) {
    return request({
        url: '/product',
        method: 'POST',
        data: data,
    });
}

export function changeStatus(id) {

    return request({
        url: '/product/status',
        method: 'POST',
        data: {id: id},
    });

}

export function getEditData(product_id) {
    return request({
        url: `/product/` + product_id + `/edit`,
        method: 'GET',
    });
}

export function getProductList(params) {

    return request({
        url: '/product',
        method: 'GET',
        params: params,
    });

}

export function getProductInfo(id) {

    return request({
        url: '/product/' + id,
        method: 'GET',
    });

}

export function productUpdate(data, product_id) {
    return request({
        url: '/product/' + product_id,
        method: 'PATCH',
        data: data,
    });
}