export function getToken(value = false) {

    let token = JSON.parse(window.localStorage.getItem('token'));

    if (token === null) {

        return false;
    }

    if (value) {

        return token[value];
    }

    return token;
}


export function setToken(config) {

    let access_token = getToken('access_token');

    if (access_token) {

        config.headers.authorization = 'Bearer ' + access_token;

    }

    return config;

}
