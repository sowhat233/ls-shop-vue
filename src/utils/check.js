import {Message} from 'element-ui';


export function checkExt(ext, allowed_ext) {

    if (!(allowed_ext.split(',')).includes(ext)) {

        Message.error({
            //把image/jpeg,image/jpg,image/png 替换成 jpeg,jpg,png
            message: `仅支持` + allowed_ext.replace(/image\//g, '') + `类型`,
            duration: 5000
        });

        return false;
    }

    return true;
}

export function checkSize(size, allowed_size) {

    if ((size / 1024 / 1024) > allowed_size) {

        Message.error({
            message: `大小不能超过` + allowed_size + `M`,
            duration: 5000
        });

        return false;
    }

    return true;

}