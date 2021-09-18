import {request} from "../request";

export function categoryEdit(data, id) {

    return request({
        url: '/category/' + id,
        method: 'PATCH',
        data: data,
    });
}