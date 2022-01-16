<template>

    <product-form :product_info="product_info" :product_detail="product_detail" :ref="product_form_ref"
                  :product_sku="product_sku" :spec_type="spec_type" @returnSubmitData="onSubmit"></product-form>

</template>

<script>

    //http
    import {getProductEditData, updateProduct} from '@/http/product';

    //子组件
    import ProductForm from './componets/ProductForm';

    //mixins
    import {closeSubmitLoading} from '@/mixins/closeSubmitLoading'

    export default {
        name: "ProductEdit",
        components: {
            ProductForm,
        },
        data() {
            return {
                product_info: {},
                product_detail: '',
                product_sku: [],
                spec_type: 1,
                product_id: null,
            };
        },
        created() {

            this.product_id = this.$route.query.id;

            this.setEditData();
        },
        mixins: [closeSubmitLoading],
        methods: {

            async getEditData() {

                return await getProductEditData(this.product_id).then(result => {

                    if (result.code === 200) {

                        return result.data;

                    } else {

                        this.$message({
                            type: 'warning',
                            message: '请求失败！',
                            duration: 5000
                        });

                    }


                });

            },
            async setEditData() {

                let data = await this.getEditData();

                //商品信息
                this.product_info = data;
                //规格类型
                this.spec_type = data.is_multiple_spec;
                //商品详情
                this.product_detail = data.detail;
                //商品sku
                this.product_sku = data.sku;

            },
            onSubmit(data) {

                updateProduct(data, this.product_id).then(result => {

                    console.log(result);

                    if (result.code === 200) {

                        this.$message({
                            'message': '更新成功!',
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

            },
        },

    };
</script>

<style scoped>

</style>