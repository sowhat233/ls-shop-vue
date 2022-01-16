import {request} from "./request";

export function addCategory(data) {

    return request({
        url: '/category',
        method: 'POST',
        data: data,
    });
}

export function updateCategory(data, id) {

    return request({
        url: '/category/' + id,
        method: 'PATCH',
        data: data,
    });
}


export function getAllCategory() {

    return request({
        url: '/category/all',
        method: 'GET',
    });

}

export function categoryDelete(id) {

    return request({
        url: '/category/' + id,
        method: 'DELETE',
    });
}

export function getCategoryEditData(id) {

    return request({
        url: '/category/' + id + /edit/,
        method: 'GET',
    });
}

export function getCategoryPaginate(params) {

    return request({
        url: '/category',
        method: 'GET',
        params: params
    });

}