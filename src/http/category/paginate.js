import {request} from "../request";

export function getCategoryPaginate(params) {

    return request({
        url: '/category',
        method: 'GET',
        params: params
    });

}