import {request} from "../request";

export function getCategoryList() {

    return request({
        url: '/category/all',
        method: 'GET',
    });

}