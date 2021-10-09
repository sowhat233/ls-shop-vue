<template>

    <category-form @returnSubmitData="onSubmit" :ref="ref_form"></category-form>

</template>

<script>

    //http
    import {addCategory} from "@/http/category";

    //组件
    import CategoryForm from "@/views/category/childComponets/CategoryForm";

    //mixins
    import {closeSubmitLoading} from "@/mixins/closeSubmitLoading";

    export default {
        name: "CategoryAdd",
        components: {
            CategoryForm,
        },
        data() {
            return {
                form: {
                    name: "",//商品名字
                    description: "",//商品简介
                },
            };
        },
        mixins: [closeSubmitLoading],
        methods: {

            onSubmit(data) {

                addCategory(data).then(result => {

                    console.log(result);

                    if (result.code === 201) {

                        this.$message({
                            "message": "提交成功!",
                            "type": "success",
                            onClose: () => {
                                location.reload();
                            },
                        });

                    } else {

                        this.$message({
                            "message": result.message,
                            "type": "error",
                        });
                    }

                    this.closeLoading();

                });

            },
            closeLoading() {

                this.loading = false;
            },
        }

    };

</script>

<style scoped>
    @import '../../assets/css/category/public.css';
</style>