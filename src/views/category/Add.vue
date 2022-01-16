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
                form: {},
            };
        },
        mixins: [closeSubmitLoading],
        methods: {

            onSubmit(data) {

                addCategory(data).then(result => {

                    console.log(result);

                    if (result.code === 201) {

                        this.$message({
                            "message": "添加成功!",
                            "type": "success",
                        });

                    } else {

                        this.$message({
                            "message": result.message,
                            "type": "error",
                        });
                    }

                });

                this.loading = false;

            },

        }

    };

</script>

<style scoped>
</style>