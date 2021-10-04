import {uploadImage} from "@/http/upload";

export function handleUploadImage(images) {

    let form_data = new FormData();

    form_data.append('image', images);

    // 发起请求
    return uploadImage(form_data);

}