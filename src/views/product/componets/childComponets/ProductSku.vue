<template>

    <div class="product-spec">

        <el-button type="primary" @click="addSpec()">添加规格项</el-button>
        <el-button type="success" @click="createSpecTable()">生成规格表</el-button>

        <!--  规格 -->
        <div class="spec-container" v-for="(item,spec_key) in specs">

            <div class="mt20 ml25 mb20">

                <!--规格名称-->
                <div class="spec-div">

                    <div class="spec-input">
                        <el-input v-model="item.name" placeholder="规格名称"></el-input>
                    </div>

                    <div>
                        <!--  添加参数 -->
                        <el-button type="primary" icon="el-icon-plus"
                                   @click="addParam(spec_key)"></el-button>
                        <!--  删除当前的规格以及所有的参数 -->
                        <el-button type="danger" icon="el-icon-delete-solid"
                                   @click="delSpec(spec_key)"></el-button>
                    </div>

                </div>

                <!--  规格参数 -->
                <div class="param-container">

                    <div class="param-div" v-for="(param,param_key) in item.params">

                        <div class="param-input">
                            <el-input v-model="item.params[param_key]" placeholder="参数名称"></el-input>
                        </div>

                        <div>
                            <!--  删除当前的参数 -->
                            <el-button type="danger" icon="el-icon-delete-solid"
                                       @click="delParam(spec_key,param_key)"></el-button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- 规格表  -->
        <div class="spec-table">

            <!--sku属性标题-->
            <div class="sku-attr-div">

                <template v-for="(value,key) in sku.title">
                    <div class="new-attr-title">{{value}}</div>
                </template>

                <template v-for="(item,key) in sku.basic_attrs">
                    <div :class="item.style">{{item.name}}</div>
                </template>

            </div>

            <!--sku属性值-->
            <template v-for="(item,key) in sku.table_data">

                <div class="sku-value-div">

                    <!--新增的属性-->
                    <template v-for="(attr,key2) in item.attrs_name">
                        <div class="sku-attr" :data-test_key2="key2">{{attr}}</div>
                    </template>

                    <!--基础的属性-->
                    <template v-for="(basic_value,key3) in sku.basic_attrs">

                        <!--  注意 此处有if 而 else 在下面的div 不要因为注释而忽视了 -->
                        <el-upload v-if="(basic_value.type==='img')"
                                   action
                                   list-type="picture"
                                   :show-file-list="false"
                                   :accept="images_ext"
                                   :before-upload="checkImg"
                                   :http-request="function (fn) { return uploadImage(fn, key)}">

                            <img :src="item.image" class="main-images" alt="sku主图">

                        </el-upload>

                        <!-- 此处的item 等于this.sku.basic_attrs
                             等于 [
                                 'attrs_name': value,
                                 'image': '',
                                 'stock': '',
                                 'price': '',
                                 'cost_price': ''
                             ]
                        -->
                        <!-- 此处的basic_value.value_name  等于 stock、price、cost_price 其中的一个-->
                        <div v-else class="sku-value-input">

                            <el-input-number v-if="(basic_value.type==='decimal')"
                                             v-model.number="item[basic_value.value_name]" :min="basic_value.min"
                                             :placeholder="basic_value.name"
                                             :precision="2"></el-input-number>

                            <el-input-number v-else="(basic_value.type==='number')"
                                             v-model.number="item[basic_value.value_name]" :min="basic_value.min"
                                             :placeholder="basic_value.name"
                                             :step="1" step-strictly></el-input-number>

                        </div>

                    </template>

                </div>

            </template>

        </div>

    </div>


</template>

<script>
    import {handleUploadImage} from "@/utils/handleUploadImage";
    import {checkExt, checkSize} from "@/utils/check";

    export default {
        name: "ProductSku",
        props: {
            //商品信息
            product_sku: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data() {

            return {
                sku_default: {
                    'title': [],
                    'table_data': [],
                    'basic_attrs': [],
                },
                sku: {},
                //规格
                specs: [],
                //基础属性
                basic_attrs: [
                    {
                        'name': '主图',
                        'style': 'basic-img-title',
                        'type': 'img',
                        'value_name': 'img'
                    },
                    {
                        'name': '库存',
                        'style': 'basic-input-title',
                        'type': 'integer',
                        'value_name': 'stock',
                        'min': 1
                    },
                    {
                        'name': '售价',
                        'style': 'basic-input-title',
                        'type': 'decimal',
                        'value_name': 'price',
                        'min': 0.01
                    },
                    {
                        'name': '进价',
                        'style': 'basic-input-title',
                        'type': 'decimal',
                        'value_name': 'cost_price',
                        'min': 0
                    },
                ],
                upload_images: require('@/assets/images/admin/upload-bg.png'),
                images_ext: 'image/jpeg,image/jpg,image/png',//图片类型
                images_size: 2,//单位 M
            };
        },
        created() {

            this.setSkuDefault();
        },
        methods: {
            setSkuDefault() {
                //设置默认值
                this.sku = this.deepCopy(this.sku_default);
            },
            setSkuData(product_sku) {
                this.sku.title = this.getSkuTitleName(product_sku);
                this.sku.table_data = this.getSkuTableData(product_sku);
                this.sku.basic_attrs = this.deepCopy(this.basic_attrs);
            },
            getSkuTitleName(product_sku) {

                let title = [];

                for (let item of product_sku) {

                    title = Object.keys(item.attrs);
                    break;
                }

                return title;

            },
            getSkuTableData(product_sku) {

                let data_obj = {}, table_data = [];

                product_sku.map((item) => {

                    data_obj = {};
                    data_obj.attrs_name = Object.values(item.attrs);
                    data_obj.attrs = item.attrs;
                    data_obj.image = item.image;
                    data_obj.stock = item.stock;
                    data_obj.price = item.price;
                    data_obj.cost_price = item.cost_price;

                    table_data.push(data_obj);

                });

                return table_data;

            },
            getSpecsData(product_sku) {

                let specs = [];
                let obj = {};

                this.sku.title.map((item) => {
                    obj = {};
                    obj.name = item;
                    obj.params = [];

                    specs.push(obj);

                });

                product_sku.map((item) => {

                    for (let index in item.attrs) {

                        for (let spec of specs) {

                            //判断属性名是否相同
                            if (index === spec.name) {

                                //判断该参数是否已经加入了
                                if (!spec.params.includes(item.attrs[index])) {

                                    spec.params.push(item.attrs[index]);
                                    break;
                                }

                            }

                        }


                    }

                });

                return specs;

            },
            //递归 sku笛卡尔积
            handleSkuCartesian(arr, previous_arr = []) {

                let sku = [];

                //去除第一个元素后
                let first_arr = arr.shift();

                //判断是否为第一次添加
                if (previous_arr.length > 1) {

                    let num = 0;

                    //遍历组装数据
                    previous_arr.map((previous, index) => {

                        first_arr.map((first_item) => {

                            //如果是个数组 就把 first_arr 里面的数据加进去
                            if (Array.isArray(previous)) {

                                previous_arr[index].push(first_item);

                                sku[num] = previous;

                            } else {

                                sku[num] = [previous, first_item];
                            }

                            num++;

                        });

                    });


                } else {

                    sku = first_arr;

                }

                //递归
                if (arr.length > 0) {

                    return this.handleSkuCartesian(arr, sku);

                }

                return sku;

            },
            // 获取sku笛卡尔积
            getSkuCartesian() {

                let spec = [];

                this.specs.map((item) => {

                    this.sku.title.push(item.name);

                    spec.push(item.params);
                });

                //笛卡尔积
                return this.handleSkuCartesian(spec);

            },
            //添加规格
            addSpec() {

                //每一个 规格(spec) 的格式
                let spec = {
                    name: '',
                    params: [],
                };

                this.specs.push(spec);

            },
            //删除规格
            delSpec(key) {

                this.specs.splice(key, 1);

            },
            //添加参数
            addParam(key) {

                let param = '';

                this.specs[key].params.push(param);

            },
            //删除参数
            delParam(spec_key, param_key) {

                this.specs[spec_key].params.splice(param_key, 1);

            },
            checkSpecItem() {

                //无规格项 不合格
                if (this.specs.length === 0) {

                    return false;
                }

                let status = true;

                for (let item of this.specs) {

                    //规格名称为空 不合格
                    if (item.name === '') {

                        status = false;

                        break;
                    }


                    //规格下面没有参数 不合格
                    if (Object.keys(item.params).length === 0) {

                        status = false;

                        break;
                    }

                    //遍历规格参数
                    for (let key in item.params) {

                        // 规格参数为空 不合格
                        if (item.params[key] === '') {

                            status = false;

                            break;
                        }

                    }

                    if (status === false) {

                        break;

                    }


                }

                return status;

            },
            //生成规格表
            createSpecTable() {

                if (!this.checkSpecItem()) {

                    this.$message({
                        'type': 'error',
                        'message': '规格或规格参数有误!'
                    });

                    return false;
                }

                // 初始化
                this.sku = this.deepCopy(this.sku_default);

                //获取sku笛卡尔积
                let sku_cartesian = this.getSkuCartesian();

                // 获取并组装sku的attrs
                let sku = this.getSkuAttrs(sku_cartesian);

                //sku属性组装
                this.assemblySkuAttr(sku);

                /*
                  最终的sku格式

                     sku = {
                        "title": ["颜色", "内存"],
                        "basic_attrs": [
                            {
                                "name": "主图",
                                "style": "basic-img-title",
                                "type": "img",
                                "value_name": "img"
                            },
                            {
                                "name": "库存",
                                "style": "basic-input-title",
                                "type": "input",
                                "value_name": "price"
                            },
                            {
                                "name": "售价",
                                "style": "basic-input-title",
                                "type": "input",
                                "value_name": "stock"
                            },
                            {
                                "name": "进价",
                                "style": "basic-input-title",
                                "type": "input",
                                "value_name": "cost_price"
                            }
                        ],
                        "table_data": [
                            {
                                "attrs_name": ["白色", "128G"],
                                "attrs": {"颜色": "白色", "内存": "128G"},
                                "image":"XXX.png",
                                "stock": "",
                                "price": "",
                                "cost_price": ""
                            }, {
                                "attrs_name": ["白色", "256G"],
                                "attrs": {"颜色": "白色", "内存": "256G"},
                                "image":"XXX.png",
                                "stock": "",
                                "price": "",
                                "cost_price": ""
                            }, {
                                "attrs_name": ["金色", "128G"],
                                "attrs": {"颜色": "金色", "内存": "128G"},
                                "image":"XXX.png",
                                "stock": "",
                                "price": "",
                                "cost_price": ""
                            }, {
                                "attrs_name": ["金色", "256G"],
                                "attrs": {"颜色": "金色", "内存": "256G"},
                                "image":"XXX.png",
                                "stock": "",
                                "price": "",
                                "cost_price": ""
                            }
                        ]
                    };

                */

            },
            //sku属性组装
            assemblySkuAttr(sku) {

                let temp = {};

                sku.map((item) => {

                    temp = {
                        'attrs_name': item.attrs_name,
                        'attrs': item.attrs,
                        'image': this.upload_images,
                        'stock': '',
                        'price': '',
                        'cost_price': '',
                    };

                    /*

                      temp = {
                           'attrs_name': ['白色','128G'],
                           'attrs': {'颜色':'白色','内存':'128G'},
                           'image': this.upload_images,
                           'stock': '',
                           'price': '',
                           'cost_price': '',
                        };

                    */

                    this.sku.table_data.push(temp);

                });

                //sku基础属性
                this.sku.basic_attrs = this.basic_attrs;

            },
            // 获取并组装sku的attrs
            getSkuAttrs(sku) {

                let spec_map = this.getSpecMap();

                let new_sku = [];

                sku.map((attrs_name) => {

                    let attrs = {}, temp = {};

                    //不是数组就改成数组
                    if (!Array.isArray(attrs_name)) {

                        attrs_name = [attrs_name];

                    }

                    console.log('attrs_name', attrs_name);

                    // sku的参数名称  attrs_name = ['白色','128G']
                    attrs_name.map((item) => {

                        attrs[String(spec_map.get(item))] = item;

                    });

                    temp.attrs_name = attrs_name;
                    temp.attrs = attrs;

                    /*
                        最终结果
                        temp = {
                            attrs_name: ['白色', '128G'],
                            attrs: {'颜色': '白色', '内存': '128G'},
                        };

                    */

                    new_sku.push(temp);

                });

                return new_sku;

            },
            getSpecMap() {

                /*
                 specs = [

                        {"name": "颜色", "params": ["白色", "金色"]},
                        {"name": "内存", "params": ["128G", "256G"]}
                    ]

                 */

                let map = new Map();

                for (let item of this.specs) {

                    for (let key in item.params) {

                        map.set(item.params[key], item.name);

                    }

                }

                return map;

                /*
                      map = {
                            "白色" => "颜色",
                            "金色" => "颜色",
                            "128G" => "内存",
                            "256G" => "内存"
                      }
                */

            },
            //组装sku
            assemblyProductSku() {

                let product_sku = {
                    'spec_items': {},
                    'sku_list': [],
                };

                //组装spec_items
                this.specs.map((item) => {

                    product_sku.spec_items[item.name] = item.params;

                });

                let table_data = this.deepCopy(this.sku.table_data);

                table_data.map((item, index) => {

                    delete table_data[index].attrs_name;

                    product_sku.sku_list.push(table_data[index]);

                });

                return product_sku;

                /* 最终提交的格式

                  product_sku = {

                         'spec_items': {

                                '颜色': ['白色', '金色'],
                                '内存': ['128G', '256G'],

                        },
                        'sku_list': [

                            {
                                'attrs': {'颜色':'白色','内存':'128G'},
                                'image': '//api.ls-shop.com/uploads/images/20201206/1607248136_ekTkF.jpg',
                                'stock': '100',
                                'price': '999',
                                'cost_price': '1024',
                            },
                            {
                                'attrs': {'颜色':'金色','内存':'256G'},
                                'image': '//api.ls-shop.com/uploads/images/20201206/1607248138_SPXHz.png',
                                'stock': '200',
                                'price': '899',
                                'cost_price': '2048',
                            },

                        ],

                    }


                 */

            },
            //给父组件返回sku
            returnData() {

                let product_sku = {
                    'product_sku': this.assemblyProductSku(),
                };

                //发送sku
                this.$emit('returnData', product_sku);

            },
            //验证数据
            validate() {

                /*

                   sku.table_data格式

                    {
                        'attrs': ['金色','128G','6.1英寸'],
                        'image': '',
                        'stock': '',
                        'price': '',
                        'cost_price': '',
                    }

                 */

                let is_empty = false;

                let error_msg = '必填项不能为空!';

                if (this.sku.table_data.length === 0) {

                    is_empty = true;

                }

                //需要验证的值 map形式
                let value_map = this.getBasicAttrsMap();

                for (let item of this.sku.table_data) {

                    //验证attrs
                    if (Object.keys(item.attrs).length === 0) {

                        error_msg = '参数错误,请刷新页面重试!';

                        is_empty = true;

                        break;
                    }

                    //验证attrs_name
                    if (item.attrs_name.length === 0) {

                        error_msg = 'sku规格参数不能为空!';

                        is_empty = true;

                        break;
                    }

                    //验证主图
                    if (item.image === this.upload_images) {

                        error_msg = 'sku图片未上传!';

                        is_empty = true;

                        break;
                    }

                    //验证每个sku的 售价 进货价 库存  是否已经填写
                    for (let key in item) {

                        //如果有这个属性
                        let basic_attr = value_map.get(key);

                        if (basic_attr !== undefined) {

                            //判断这个属性的值是否为空
                            if (item[key] === '' || item[key] === undefined) {

                                error_msg = basic_attr + '未填写!';

                                is_empty = true;

                                break;
                            }
                        }


                    }

                    //验证进货价
                    if (item.cost_price >= this.price) {

                        error_msg = '进货价不能为大于或等于售价!';

                        is_empty = true;

                        break;
                    }

                    //验证不通过
                    if (is_empty) {

                        break;

                    }

                }

                //验证不通过
                if (is_empty) {

                    this.$message({
                        'type': 'error',
                        'message': error_msg
                    });

                    //告诉父组件验证不通过
                    this.$emit('validateFailed');

                }


            },
            //检查主图类型和大小
            checkImg(file) {

                let check_img = checkExt(file.type, this.images_ext);

                if (!check_img) {
                    return false;
                }

                let check_size = checkSize(file.size, this.images_size);

                if (!check_size) {
                    return false;
                }

            },
            //sku主图上传
            uploadImage(params, key) {

                handleUploadImage(params.file).then(result => {

                    if (result.code === 201) {

                        this.sku.table_data[key].image = result.data.img_url;

                        this.$message({
                            'type': 'success',
                            'message': result.message,
                        });


                    } else {

                        this.$message({
                            type: 'warning',
                            message: result.message,
                            duration: 5000
                        });

                    }

                });

            },
            getBasicAttrsMap() {

                let map = new Map();

                this.basic_attrs.map((item) => {

                    map.set(item.value_name, item.name);

                });

                return map;
            },

        }, watch: {
            product_sku(value, old_value) {

                //如果不为空 说明是编辑 需要赋值
                if (value !== 0) {

                    this.setSkuData(value);

                    this.specs = this.getSpecsData(value);

                }
            }
        }
    };
</script>

<style scoped>

    .main-images {
        width: 70px;
        height: 65px;
    }

    .spec-container {
        display: flex;
        margin-top: 30px;
        border: 1px solid #eee;
    }

    .spec-div {
        display: flex;
    }

    .spec-input {
        width: 345px;
        margin-right: 15px;
    }

    .param-container {
        display: flex;
        flex-wrap: wrap;
    }

    .param-div {
        display: flex;
        margin-top: 15px;
        margin-right: 35px;
    }

    .param-input {
        width: 200px;
        margin-right: 10px;
    }

    .sku-attr {
        width: 80px;
    }

    .product-spec {
        width: 100%;
        margin: 0 auto;
        --suk-basic-flex: 5;
    }

    .product-spec input {
        height: 36px;
    }

    .sku-attr-div {
        display: flex;
        align-items: center;
        text-align: center;
        height: 60px;
    }

    .sku-value-div {
        height: 75px;
        display: flex;
        align-items: center;
        text-align: center;
        border-top: 1px solid #333;
    }

    .basic-input-title {
        flex: var(--suk-basic-flex);
    }

    .basic-img-title {
        width: 65px;
    }

    .new-attr-title {
        width: 80px;
    }

    .sku-value-input {
        flex: var(--suk-basic-flex);
        padding-left: 30px;
    }

    .single-spec-btn {
        margin-left: 50px;
    }

</style>