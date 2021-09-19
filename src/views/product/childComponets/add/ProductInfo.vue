<template>

    <el-form ref="form" :model="form" :rules="rules" label-width="95px">

        <el-form-item label="商品分类" prop="category_id">
            <el-select v-model="form.category_id" class="w100b" placeholder="请选择商品分类">
                <el-option v-for="item in category_list" :value="item.id"
                           :label="item.name" :key="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label="商品简介" prop="description">
            <el-input v-model="form.description" type="textarea" rows="5" placeholder="请输入商品简介"></el-input>
        </el-form-item>

        <el-form-item label="商品主图" prop="image">
            <el-upload
                    action
                    list-type="picture"
                    :show-file-list="false"
                    :accept="images_ext"
                    :http-request="uploadImages"
                    :before-upload="checkImg">
                <img :src="form.image ? form.image :upload_image" class="main-image">
            </el-upload>
        </el-form-item>

        <el-form-item label="商品轮播图" prop="carousels">
            <el-upload
                    action
                    multiple
                    list-type="picture-card"
                    :before-upload="checkImg"
                    :on-exceed="handleCarouselExceed"
                    :http-request="uploadCarousel"
                    :on-remove="handleCarouselRemove"
                    :on-preview="handleCarouselPreview"
                    :file-list="form.carousels"
                    :limit="carousels_limit"
                    :accept="images_ext">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialog_visible">
                <img width="100%" :src="dialog_image_url" alt="商品轮播图">
            </el-dialog>
        </el-form-item>

        <el-form-item label="商品状态">
            <el-switch inactive-color="#DD001B" v-model="form.is_launched"
                       name="is_launched"
                       :active-value="status_arr.active_value"
                       :inactive-value="status_arr.inactive_value"
                       :active-text="status_arr.active_text"
                       :inactive-text="status_arr.inactive_text"></el-switch>
        </el-form-item>

        <el-form-item label="规格类型">
            <el-switch v-model="form.is_multiple_spec" @change="changeSpecType()"
                       name="is_multiple_spec"
                       :active-value="spec_type.active_value"
                       :inactive-value="spec_type.inactive_value"
                       :active-text="spec_type.active_text"
                       :inactive-text="spec_type.inactive_text"></el-switch>
        </el-form-item>

        <div v-show="!form.is_multiple_spec">

            <el-form-item label="商品库存" prop="stock">
                <el-input-number v-model.number="form.stock" placeholder="商品库存"
                                 :min="1" :step="1" step-strictly></el-input-number>
            </el-form-item>

            <el-form-item label="商品售价" prop="price">
                <el-input-number v-model.number="form.price" placeholder="商品售价"
                                 :min="0.01" :precision="2"></el-input-number>
            </el-form-item>

            <el-form-item label="商品进价" prop="cost_price">
                <el-input-number v-model="form.cost_price" placeholder="商品进价"
                                 :min="0.00" :precision="2"></el-input-number>
            </el-form-item>

        </div>

    </el-form>

</template>

<script>
    import {handleUploadImages} from "@/utils/handleUploadImages";
    import {checkExt, checkSize} from "@/utils/check";

    export default {
        name: "ProductInfo",
        props: {
            category_list: {
                type: Array,
                default: [],
            },
        },
        data() {
            return {
                form: {
                    category_id: '',//商品类型id
                    name: '',//商品名字
                    description: '',//商品简介
                    image: '',//商品主图
                    is_launched: 1,//商品状态
                    carousels: [],//轮播图
                    is_multiple_spec: 1,//是否为多规格
                    stock: '',//单规格商品的库存
                    price: '',//单规格商品的售价
                    cost_price: '',//单规格商品的进价
                },
                dialog_image_url: '',//预览图片url
                dialog_visible: false,//预览图片显示（轮播图用）
                upload_image: require('@/assets/images/admin/upload-bg.png'),
                status_arr: {
                    'active_value': 1,
                    'inactive_value': 0,
                    'active_text': '上架',
                    'inactive_text': '下架',
                },
                spec_type: {
                    'active_value': 1,
                    'inactive_value': 0,
                    'active_text': '多规格',
                    'inactive_text': '单规格',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称!', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 200 个字符!', trigger: 'blur'},
                    ],
                    category_id: [
                        {required: true, message: '请选择商品类型!', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入商品简介!', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度在 1 到 255 个字符!', trigger: 'blur'},
                    ],
                    image: [
                        {required: true, message: '请上传图片!', trigger: 'blur'},
                    ],
                    carousels: [
                        {required: true, message: '请上传轮播图!', trigger: 'blur'},
                    ],
                },
                //单规格的表单验证
                single_spec_rules: {
                    stock: [
                        {required: true, message: '请输入商品库存!', trigger: 'blur'},
                        {type: 'number', min: 0, message: '商品库存必须是整数!', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入商品售价!', trigger: 'blur'},
                        {validator: this.checkSellPrice, trigger: 'blur'}
                    ],
                    cost_price: [
                        {required: true, message: '请输入商品进价!', trigger: 'blur'},
                        {validator: this.checkCostPrice, trigger: 'blur'}
                    ],
                },
                carousels_limit: 5,//轮播图数量
                images_ext: 'image/jpeg,image/jpg,image/png',//图片类型
                images_size: 2,//单位 M
            };
        },
        created() {
            this.form = {
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
                "stock": "",
                "price": "",
                "cost_price": "",
            };
        },
        methods: {
            checkSellPrice(rule, value, callback) {

                if (value < 0.01) {

                    callback(new Error(`商品售价不能小于0.01`));

                    return false;
                }
            },
            checkCostPrice(rule, value, callback) {

                if (value >= this.form.price) {

                    callback(new Error(`商品进价不能大于或等于售价`));

                    return false;
                }
            },
            //检查图片类型和大小
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
            //商品主图上传
            uploadImages(params) {

                handleUploadImages(params.file).then(result => {

                    if (result.code === 201) {

                        this.form.image = result.data.img_url;

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
            //商品轮播图上传
            uploadCarousel(params) {

                handleUploadImages(params.file).then(result => {

                    if (result.code === 201) {

                        this.form.carousels.push({
                            'url': result.data.img_url,
                            'name': result.data.img_name,
                        });

                        this.$message({
                            'type': 'success',
                            'message': result.msg,
                        });

                    } else {

                        this.$message({
                            type: 'warning',
                            message: result.msg,
                            duration: 5000
                        });

                    }

                });

            },
            //商品轮播图超出个数限制
            handleCarouselExceed(files, file_list) {

                this.$message.warning(`只能上传` + this.carousels_limit + `张图片`);
            },
            //商品轮播图删除回调
            handleCarouselRemove(file, file_list) {

                let key = 0;

                for (let value of this.form.carousels) {

                    if (file.name === value.name) {

                        this.form.carousels.splice(key, 1);

                    }

                    key++;

                }

            },
            //预览已上传的轮播图照片
            handleCarouselPreview(file) {
                this.dialog_image_url = file.url;
                this.dialog_visible = true;
            },
            //单规格多规格切换
            changeSpecType() {

                //如果启用多规格 删除rules里的单规格验证规则
                if (this.form.is_multiple_spec === 1) {

                    //删除rules里的单规格验证规则
                    let single_spec_rules = Object.keys(this.single_spec_rules);

                    for (let key in this.rules) {

                        //如果有 那就删除
                        if (this.inArray(single_spec_rules, key)) {

                            delete this.rules[key];

                        }

                    }
                    //如果启用单规格 给rules里添加单规格相关input框的验证规则
                } else {

                    for (let key in this.single_spec_rules) {

                        this.rules[key] = this.single_spec_rules[key];
                    }

                }

                //告诉父组件当前规格的类型
                this.$emit('specType', this.form.is_multiple_spec);

            },
            //验证
            validate() {

                this.$refs['form'].validate((valid) => {

                    //如果验证不通过
                    if (!valid) {

                        //告诉父组件验证不通过
                        this.$emit('validateFailed');

                    }

                    //阻止表单提交
                    return false;

                });

            },//过滤
            filterReturnData() {

                let carousels = [], product_info = this.copyDeep(this.form);

                product_info.carousels.filter((value) => {
                    carousels.push(value.url);
                });

                product_info.carousels = carousels;

                return product_info;

            },
            //给父组件返回数据
            returnData() {

                let product_info = {
                    'product_info': this.filterReturnData(),
                };

                //发送表单的数据
                this.$emit('returnData', product_info);

            },

        },

    };
</script>

<style scoped>

</style>