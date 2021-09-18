import {request} from "../request";

export function getCategoryList() {

    return request({
        url: '/product/category',
        method: 'GET',
    });

}