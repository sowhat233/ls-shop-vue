import {uploadImages} from "@/http/upload/images";

export function handleUploadImages(images) {

    let form_data = new FormData();

    form_data.append('images', images);

    // 发起请求
    return uploadImages(form_data);

}




