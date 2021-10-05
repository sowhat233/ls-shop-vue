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
    import {editCategory, getCategoryEditData} from "@/http/category";

    //组件
    import CategoryForm from '@/views/category/childComponets/CategoryForm';


    export default {
        name: "CategoryEdit",
        components: {
            CategoryForm,
        },
        data() {
            return {
                form: {},
                data: [],
                category_id: null,
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

                    editCategory(this.data, this.category_id).then(result => {

                        console.log(result);

                        if (result.code === 200) {

                            this.$message({
                                'message': '编辑成功!',
                                'type': 'success',
                            });

                        } else {

                            this.$message({
                                'message': result.message,
                                'type': 'error',
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
        },
        created() {

            this.category_id = this.$route.query.id;

            getCategoryEditData(this.category_id).then(result => {

                console.log(result);

                this.form = result.data;

            });


        }

    };

</script>

<style scoped>
    @import '../../assets/css/category/public.css';
</style>