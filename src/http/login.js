import {request} from "./request";

export function login(form_data) {

    return request({
        url: '/login',
        method: 'POST',
        data: form_data,
    });


}