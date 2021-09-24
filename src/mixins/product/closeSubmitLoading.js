export const closeSubmitLoading = {
    data() {
        return {
            product_form_ref: 'product_form'
        };
    },
    methods: {

        closeLoading() {

            this.$refs[this.product_form_ref].closeLoading();
        }
    },
};