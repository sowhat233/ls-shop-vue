export function getToken(value = 'access_token') {

    let token = JSON.parse(window.localStorage.getItem('token'));

    if (token === null) {

        return false;
    }

    //如果传的是false 那么就把整个对象返回
    if (!value) {

        return token;
    }

    return token[value];

}


export function setToken(config) {

    let access_token = getToken();

    if (access_token) {

        config.headers.authorization = 'Bearer ' + access_token;

    }

    return config;

}
