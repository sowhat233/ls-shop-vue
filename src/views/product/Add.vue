<template>

    <el-tabs type="border-card" v-model="active_tab">

        <el-tab-pane label="商品信息" :name="refs.info.name">

            <product-info :ref="refs.info.name" :category_list="category_list" @specType="specType"
                          @validateFailed="validateFailed" @returnData="getComponentData"></product-info>

        </el-tab-pane>

        <el-tab-pane label="商品详情" :name="refs.detail.name">

            <product-detail :ref="refs.detail.name"
                            @validateFailed="validateFailed" @returnData="getComponentData"></product-detail>

        </el-tab-pane>

        <template v-if="is_multiple_spec">

            <el-tab-pane label="商品规格" :name="refs.sku.name">

                <product-sku :ref="refs.sku.name"
                             @validateFailed="validateFailed" @returnData="getComponentData"></product-sku>

            </el-tab-pane>

        </template>


        <el-button type="primary" @click="onSubmit">立即创建</el-button>

    </el-tabs>


</template>

<script>

    /*

    最终sku格式：

    spu:{'颜色':['白色','金色'],'内存':['128G']}

    sku_list:[

        {

        'stock':100,
        'price':50.5,
        'cost_price':30,
        'sku':{'颜色':'白色','内存':'128G'}

        },
        {

        'id':114515,
        'stock':105,
        'price':50.5,
        'cost_price':30,
        'sku': {'颜色':'金色','内存':'128G'}

        },

    ]

     */

    //http
    import {productAdd} from "@/http/product/add";
    import {getCategoryList} from "@/http/category/list";

    //组件
    import ProductInfo from '@/views/product/childComponets/add/ProductInfo';
    import ProductDetail from '@/views/product/childComponets/add/ProductDetail';
    import ProductSku from '@/views/product/childComponets/add/ProductSku';


    export default {
        name: "ProductAdd",
        components: {
            ProductInfo,
            ProductDetail,
            ProductSku,
        },
        data() {
            return {
                category_list: [], //商品分类
                refs: {
                    'info': {'name': 'product_info', 'submit': true},
                    'detail': {'name': 'product_detail', 'submit': true},
                    'sku': {'name': 'product_sku', 'submit': true},
                },
                is_multiple_spec: 1,//默认为多规格
                component_data: {},
                submit_data: {
                    'product_info': {},
                    'product_sku': {}
                },
                valid: true,
                loading: false,
                active_tab: null,
                test: {
                    "product_info": {
                        "category_id": 1,
                        "name": "13",
                        "description": "23",
                        "image": "//api.ls-shop.com/uploads/images/20210917/1631829461_RVL6A.png",
                        "is_launched": 1,
                        "carousels": [
                            {
                                "url": "//api.ls-shop.com/uploads/images/20210917/1631829570_1XZft.png",
                                "name": "1631829570_1XZft.png",
                                "uid": 1631829571253,
                                "status": "success"
                            }
                        ],
                        "is_multiple_spec": 0,
                        "stock": "1",
                        "price": "1.11",
                        "cost_price": "0.01",
                        "detail": "商品详情商品详情商品详情商品详情商品详情",
                    },
                    "product_sku": {}
                },
                test2: {
                    "product_info": {
                        "category_id": 1,
                        "name": "13",
                        "description": "23",
                        "image": "//api.ls-shop.com/uploads/images/20210917/1631829461_RVL6A.png",
                        "is_launched": 1,
                        "carousels": [
                            {
                                "url": "//api.ls-shop.com/uploads/images/20210917/1631829570_1XZft.png",
                                "name": "1631829570_1XZft.png",
                                "uid": 1631829571253,
                                "status": "success"
                            }
                        ],
                        "is_multiple_spec": 1,
                        "stock": "1",
                        "price": "1.11",
                        "cost_price": "0.01",
                        "detail": "商品详情商品详情商品详情商品详情商品详情",
                    },
                    "product_sku": {
                        "spec_items": {"颜色": ["白色", "金色"], "内存": ["128G"]},
                        "sku_list": [
                            {
                                "attrs": {"颜色": "白色", "内存": "128G"},
                                "image": "//api.ls-shop.com/uploads/images/20201210/1607595459_Jk3cB.jpg",
                                "stock": "33333",
                                "price": "1111",
                                "cost_price": "222"
                            }, {
                                "attrs": {"颜色": "金色", "内存": "128G"},
                                "image": "//api.ls-shop.com/uploads/images/20201210/1607595460_AKDbW.png",
                                "stock": "44444",
                                "price": "5555",
                                "cost_price": "666"
                            }
                        ]
                    }
                },
            };
        },
        created() {

            //在data()函数里无法直接赋值 所以只能在这里赋值
            this.active_tab = this.refs.info.name;

            getCategoryList().then(result => {

                console.log(result);

                this.category_list = result.data;

            });

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

                    productAdd(submit_data).then(result => {

                        console.log(result);

                        if (result.code === 201) {

                            this.$message({
                                'message': '提交成功!',
                                'type': 'success',
                                // onClose: () => {
                                //
                                //     this.$router.push({
                                //         name: 'ProductIndex',
                                //     });
                                // },
                            });

                        } else {

                            this.$message({
                                'type': 'warning',
                                'message': result.message,

                            });
                        }


                    });

                    this.loading = false;
                }

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

                // 测试用 记得取消下面的注释
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

                submit_data = this.test; //测试用 可删

                return submit_data;

            },
        },
    };
</script>

<style scoped>

</style>