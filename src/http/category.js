import {request} from "./request";

export function categoryAdd(data) {

    return request({
        url: '/category',
        method: 'POST',
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

export function categoryEdit(data, id) {

    return request({
        url: '/category/' + id,
        method: 'PATCH',
        data: data,
    });
}


export function categoryFindById(id) {

    return request({
        url: '/category/' + id,
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