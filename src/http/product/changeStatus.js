import {request} from "../request";

export function changeStatus(id) {

    return request({
        url: '/product/status',
        method: 'POST',
        params: id,
    });

}