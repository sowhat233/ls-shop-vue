<template>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="分类描述" prop="description">
            <el-input v-model="form.description" type="textarea" rows="10"></el-input>
        </el-form-item>

        <div class="submit-div">
            <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
        </div>

    </el-form>

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
                    };

                },
            },

        },
        data() {
            return {
                loading: false,
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

</style>