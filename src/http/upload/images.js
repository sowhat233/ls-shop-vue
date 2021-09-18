import {request} from "../request";

export function uploadImages(data) {
    return  request({
        url: '/images',
        method: 'post',
        data: data,
    });
}