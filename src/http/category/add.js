import {request} from "../request";

export function categoryAdd(data) {

    return request({
        url: '/category',
        method: 'POST',
        data: data,
    });
}