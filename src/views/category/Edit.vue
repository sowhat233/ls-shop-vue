<template>

    <category-form @returnSubmitData="onSubmit" :ref="ref_form" :form="form"></category-form>

</template>

<script>

    //http
    import {updateCategory, getCategoryEditData} from "@/http/category";

    //组件
    import CategoryForm from "@/views/category/childComponets/CategoryForm";

    //mixins
    import {closeSubmitLoading} from "@/mixins/closeSubmitLoading";

    export default {
        name: "CategoryEdit",
        components: {
            CategoryForm,
        },
        data() {
            return {
                form: {},
                category_id: null,
            };
        },
        mixins: [closeSubmitLoading],
        methods: {

            onSubmit(data) {

                updateCategory(data, this.category_id).then(result => {

                    console.log(result);

                    if (result.code === 200) {

                        this.$message({
                            "message": "更新成功!",
                            "type": "success",
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

</style>