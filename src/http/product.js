import {request} from "./request";

export function createProduct(data) {
    return request({
        url: '/product',
        method: 'POST',
        data: data,
    });
}

export function updateProduct(data, id) {
    return request({
        url: '/product/' + id,
        method: 'PATCH',
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

export function getProductEditData(id) {
    return request({
        url: `/product/` + id + `/edit`,
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

