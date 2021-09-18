<template>

    <div class="add-container">

        <category-form :ref="ref" :form="form" @validateFailed="validateFailed"
                       @returnData="getComponentData"></category-form>

        <div class="submit-div">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </div>

    </div>

</template>

<script>

    //http
    import {categoryAdd} from "@/http/category/add";

    //组件
    import CategoryForm from '@/views/category/childComponets/CategoryForm';


    export default {
        name: "CategoryAdd",
        components: {
            CategoryForm,
        },
        data() {
            return {
                form: {
                    name: '',//商品名字
                    description: '',//商品简介
                },
                data: [],
                ref: 'component_form',
                loading: false,
                valid: true
            };
        },

        methods: {

            onSubmit() {

                //验证数据
                this.validateData();

                //验证
                if (this.valid) {

                    //获取数据 子组件会触发父组件的getComponentData方法 然后赋值给this.data
                    this.$refs[this.ref].returnData();

                    this.loading = true;

                    categoryAdd(this.data).then(result => {

                        console.log(result);

                        if (result.code === 201) {

                            this.$message({
                                'message': '提交成功!',
                                'type': 'success',
                            });

                        } else {

                            this.$message({
                                'message': result.message,
                                'type': 'warning',
                            });
                        }

                    });

                    this.loading = false;

                }

            },
            validateData() {

                this.$refs[this.ref].validate();

            },
            validateFailed() {

                this.valid = false;

            },
            getComponentData(value) {

                this.data = value;

            },

        }

    };

</script>

<style scoped>
    @import '../../assets/css/category/public.css';
</style>