<template>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px" >

        <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="分类描述" prop="description">
            <el-input v-model="form.description" type="textarea" rows="10"></el-input>
        </el-form-item>

    </el-form>

</template>

<script>
    export default {
        name: "CategoryForm",
        props: {
            form: {
                type: Object,
                default: {
                    name: '',
                    description: '',
                },
            },

        },
        data() {
            return {
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
                    ],
                    description: [
                        {max: 200, message: '长度不能超过 200 个字符', trigger: 'blur'},
                    ],

                },
            };
        },
        methods: {

            //验证
            validate() {

                this.$refs['form'].validate((valid) => {

                    //如果验证不通过
                    if (!valid) {

                        //告诉父组件验证不通过
                        this.$emit('validateFailed');

                    }

                    //阻止表单提交
                    return false;

                });

            },
            //给父组件返回数据
            returnData() {

                //发送表单的数据
                this.$emit('returnData', this.form);

            },

        },
    };
</script>

<style scoped>

</style>