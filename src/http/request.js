import axios from "axios";
import {Message} from 'element-ui';
import {getToken,setToken} from "../utils/token";

export function request(config) {

    const instance = axios.create({
        baseURL: 'http://api.ls-shop.com:5200/api/v1/admin',
        timeout: 10000,
    });

    //请求拦截
    instance.interceptors.request.use(config => {

            config = setToken(config);

            return config;

        }, error => {

            console.log('请求拦截环节出错' + error);

        },
    );

    //响应拦截
    instance.interceptors.response.use(result => {

            return result.data;

        }, error => {

            console.log('响应拦截非2XX错误--');

            console.log('error------', error);
            console.log('error-response-----', error.response);

            let error_msg = '';

            if (error.response) {

                switch (error.response.status) {

                    //没有token或未登录
                    case 401:

                        //删除token
                        window.localStorage.removeItem("token");

                        Message.error({
                            'message': '未登录',
                            duration: 5000
                        });

                        //重定向
                        window.location.href = "#/login";

                        return false;

                    case 422:

                        let keyArr = Object.keys(error.response.data.errors);

                        //错误验证的结果
                        error_msg = error.response.data.errors[keyArr[0]][0];

                        break;


                    case 500:

                        //错误验证的结果
                        error_msg = error.response.data.message;

                        break;

                    default:

                        error_msg = error.response.data.message;
                }

            }

            Message.error({
                'message': error_msg,
                duration: 5000
            });

            return Promise.reject(error_msg);

        },
    );

    return instance(config);
}


