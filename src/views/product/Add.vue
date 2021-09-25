<template>

    <product-form @returnSubmitData="onSubmit" :ref="product_form_ref"></product-form>

</template>

<script>

    //http
    import {productAdd} from "@/http/product";

    //子组件
    import ProductForm from './componets/ProductForm';

    //mixins
    import {closeSubmitLoading} from '@/mixins/product/closeSubmitLoading'

    export default {
        name: "ProductAdd",
        components: {
            ProductForm,
        },
        data() {
            return {};
        },
        created() {

        },
        mixins: [closeSubmitLoading],
        methods: {

            onSubmit(data) {

                productAdd(data).then(result => {

                    console.log(result);

                    if (result.code === 201) {

                        this.$message({
                            'message': '提交成功!',
                            'type': 'success',
                            onClose: () => {
                                location.reload();
                            },
                        });

                    } else {

                        this.$message({
                            'type': 'warning',
                            'message': result.message,

                        });
                    }

                    this.closeLoading();

                });

            }
        },
    };
</script>

<style scoped>

</style>