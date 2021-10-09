export const closeSubmitLoading = {
    data() {
        return {
            ref_form: 'ref_form'
        };
    },
    methods: {

        closeLoading() {

            this.$refs[this.ref_form].closeLoading();
        }
    },
};