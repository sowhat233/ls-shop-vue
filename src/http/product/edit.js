import {request} from "../request";

export function getEditData(product_id) {
    return request({
        url: `/product/` + product_id + `/edit`,
        method: 'GET',
    });
}