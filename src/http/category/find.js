import {request} from "../request";

export function categoryFindById(id) {

    return request({
        url: '/category/' + id,
        method: 'GET',
    });
}