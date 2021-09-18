import {request} from "../request";

export function CategoryDelete(id) {

    return request({
        url: '/category/' + id,
        method: 'DELETE',
    });
}