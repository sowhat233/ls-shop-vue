<template>

    <el-tabs type="border-card" v-model="active_tab">

        <el-tab-pane label="商品信息" :name="refs.info.name">

            <product-info :ref="refs.info.name" @specType="specType" v-bind="$attrs"
                          @validateFailed="validateFailed" @returnData="getComponentData"></product-info>

        </el-tab-pane>

        <el-tab-pane label="商品详情" :name="refs.detail.name">

            <product-detail :ref="refs.detail.name" v-bind="$attrs"
                            @validateFailed="validateFailed" @returnData="getComponentData"></product-detail>

        </el-tab-pane>

        <template v-if="(is_multiple_spec===1)">

            <el-tab-pane label="商品规格" :name="refs.sku.name">

                <product-sku :ref="refs.sku.name" v-bind="$attrs"
                             @validateFailed="validateFailed" @returnData="getComponentData"></product-sku>

            </el-tab-pane>

        </template>

        <el-button type="primary" @click="onSubmit" class="submit-btn" :loading="loading">提交</el-button>

    </el-tabs>

</template>

<script>

    //子组件
    import ProductInfo from './childComponets/ProductInfo';
    import ProductDetail from './childComponets/ProductDetail';
    import ProductSku from './childComponets/ProductSku';


    export default {
        name: "ProductForm",
        props: {
            spec_type: {
                type: Number,
                default: 1,//默认为多规格
            }
        },
        components: {
            ProductInfo,
            ProductDetail,
            ProductSku,
        },
        data() {
            return {
                refs: {
                    'info': {'name': 'product_info', 'submit': true},
                    'detail': {'name': 'product_detail', 'submit': true},
                    'sku': {'name': 'product_sku', 'submit': true},
                },
                component_data: {},
                submit_data: {
                    'product_info': {},
                    'product_sku': {}
                },
                is_multiple_spec: 1,
                valid: true,
                loading: false,
                active_tab: null,
            };
        },
        created() {

            //在data()函数里无法直接赋值 所以只能在这里赋值
            this.active_tab = this.refs.info.name;

        },
        methods: {

            onSubmit() {

                //先清空
                this.component_data = [];

                //每次提交 都要重新设为true
                this.valid = true;

                //验证数据
                this.validateData();

                //如果都没问题
                if (this.valid) {

                    //获取数据
                    this.getSubmitDataFn();

                    //数据处理
                    let submit_data = this.handleSubmitData();

                    this.loading = true;

                    //给父组件返回数据
                    this.$emit('returnSubmitData', submit_data);

                }

            },
            closeLoading() {

                this.loading = false;
            },
            validateFailed() {

                this.valid = false;

            },
            specType(type) {

                this.is_multiple_spec = type;

                //如果启用多规格 就需要验证product-sku组件的数据以及提取数据
                if (this.is_multiple_spec === 1) {

                    this.refs.sku.submit = true;

                } else {

                    this.refs.sku.submit = false;

                }
            },
            validateData() {

                //验证 商品信息 商品详情 商品Sku
                //循环调用子组件的validate方法 如果 验证不通过 子组件会触发父组件的validateFailed方法 把 valid 修改为 false
                for (let item of Object.values(this.refs)) {

                    console.log(item.name);

                    if (item.submit) {

                        this.$refs[item.name].validate();

                        //如果有一个验证不通过 则结束循环
                        if (!this.valid) {

                            console.log('验证不通过--- ' + item.name);

                            this.active_tab = item.name;

                            break;
                        }
                    }


                }


            },
            getSubmitDataFn() {

                //循环调用子组件的returnData方法 子组件会触发父组件的getComponentData方法 然后赋值给this.data
                for (let item of Object.values(this.refs)) {

                    if (item.submit) {

                        this.$refs[item.name].returnData();

                    }

                }

            },
            getComponentData(value) {

                for (let key in value) {

                    this.component_data[key] = value[key];
                }

            },
            handleSubmitData() {

                /*

                   this.component_data = {

                      'product_info':'XXX',
                      'product_detail':'XXX',
                      'product_sku':'XXX',

                    {

                    改成这样子

                    submit_data = {

                      'product_info':{

                        'name':xxx,
                        'image':xxx,
                        'details':xxx,

                      },
                      'product_sku':'XXX',

                    }


                  */

                let submit_data = this.deepCopy(this.submit_data);

                let data = this.component_data;

                //商品信息
                submit_data.product_info = data.product_info;

                //商品详情
                submit_data.product_info.detail = data.product_detail;

                if (this.is_multiple_spec === 1) {

                    submit_data.product_sku = data.product_sku;

                }

                return submit_data;

            },
        },
        watch: {
            spec_type(value, old_value) {

                this.is_multiple_spec = value;

                if (this.is_multiple_spec !== 1) {
                    //单规格情况下 不验证sku
                    this.refs.sku.submit = false;
                }

            }
        }
    };
</script>

<style scoped>
    .submit-btn {
        margin-top: 20px;
    }
</style>