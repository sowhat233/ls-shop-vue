<template>

    <div class="category-container">

        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="分类描述" prop="description">
                <el-input v-model="form.description" type="textarea" rows="10"></el-input>
            </el-form-item>

            <el-form-item label="商品主图" prop="image">
                <el-upload
                        action
                        list-type="picture"
                        :show-file-list="false"
                        :accept="images_ext"
                        :http-request="handleUploadImage"
                        :before-upload="checkImg">
                    <img :src="form.image ? form.image :upload_image" class="main-image">
                </el-upload>
            </el-form-item>

            <div class="submit-div">
                <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CategoryForm",
        props: {
            form: {
                type: Object,
                default: () => {
                    return {
                        name: "",
                        description: "",
                        image: "",
                    };

                },
            },

        },
        data() {
            return {
                loading: false,
                images_ext: 'image/jpeg,image/jpg,image/png',//图片类型
                images_size: 2,//单位 M
                upload_image: require('@/assets/images/admin/upload-bg.png'),
                rules: {
                    name: [
                        {required: true, message: "请输入商品名称", trigger: "blur"},
                        {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"},
                    ],
                    description: [
                        {max: 200, message: "长度不能超过 200 个字符", trigger: "blur"},
                    ],

                },
            };
        },
        methods: {

            onSubmit() {

                this.$refs["form"].validate((valid) => {

                    //验证通过
                    if (valid) {

                        this.loading = true;

                        //发送表单的数据给父组件
                        this.$emit("returnSubmitData", this.form);

                    }

                    //阻止表单提交
                    return false;

                });
            }

        },
    };
</script>

<style scoped>
    .category-container {
        padding: 25px;
        min-height: 780px;
        background: #FFF;
        border: 1px solid #DCDFE6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    .submit-div {
        padding-top: 30px;
    }
</style>