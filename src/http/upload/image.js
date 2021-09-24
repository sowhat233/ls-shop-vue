import {request} from "../request";

export function uploadImage(data) {
    return  request({
        url: '/image',
        method: 'post',
        data: data,
    });
}