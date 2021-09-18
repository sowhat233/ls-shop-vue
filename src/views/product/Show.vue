<template>

    <div class="show">

        <div class="tac jcc aic pb80">
            <strong>{{data.name}}</strong>
            <div class="pt35 c666">{{data.created_at}}</div>
        </div>

        <div class="content">

            <div class="mb40">
                <strong>商品分类：</strong>
                <span>{{data.category_name}}</span>
            </div>

            <div class="mb40">
                <strong>商品总销量：</strong>
                <span>{{data.sales}}</span>
            </div>

            <div class="mb40">
                <strong>商品评论量：</strong>
                <span>{{data.comments}}</span>
            </div>

            <div class="mb40">
                <strong>商品评分：</strong>
                <span>{{data.rating}}</span>
            </div>

            <div class="mb40">
                <strong>商品库存：</strong>
                <span>{{data.stock}}</span>
            </div>


            <div class="mb40">
                <strong>商品简介：</strong>
                <span>{{data.description}}</span>
            </div>

            <div class="mb40">
                <strong>商品详情：</strong>
                <span v-html="data.detail"></span>
            </div>

            <div class="mb40">
                <strong>商品主图：</strong>
                <img :src="data.image" alt="" class="cursor" @click="checkImg(data.image)">
            </div>

            <div class="mb40">
                <strong>商品轮播图：</strong>
                <template v-for="(item,key) in data.carousels">
                    <img :src="item" alt="" class="cursor" @click="checkImg(item)">
                </template>
            </div>

            <div class="mb40">
                <strong>商品状态：</strong>
                <span>{{data.status_name}}</span>
            </div>


            <div class="spec-table">
                <div class="attr-div">
                    <div class="attr" v-for="(item,key) in data.attrs_title">{{item}}</div>
                    <div class="w110">图片</div>
                    <div class="flex5">库存</div>
                    <div class="flex5">售价</div>
                    <div class="flex5">成本价</div>
                </div>
                <div class="sku-value-div" v-for="(item,key) in data.sku">

                    <div class="attr" v-for="(attr,key2) in item.attrs">{{attr}}</div>

                    <div class="w110">
                        <div tabindex="0" class="el-upload cursor" @click="checkImg(item.image)">
                            <img :src="item.image" alt="" class="main-images">
                        </div>
                    </div>

                    <div class="flex5">
                        <div class="el-input">
                            {{item.stock}}
                        </div>
                    </div>

                    <div class="flex5">
                        <div class="el-input">
                            {{item.price}}
                        </div>
                    </div>

                    <div class="flex5">
                        <div class="el-input">
                            {{item.cost_price}}
                        </div>
                    </div>

                </div>

            </div>

        </div>

        <!--        <el-dialog title="图片查看" :visible.sync="dialog_img_visible" width="80%" >-->
        <!--            <div>-->
        <!--                <el-image :src="data.image" fit="scale-down" lazy>-->
        <!--                    <div slot="error" class="image-slot">-->
        <!--                        <i class="el-icon-picture-outline"></i>-->
        <!--                    </div>-->
        <!--                </el-image>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--                <el-button @click="dialog_img_visible = false" type="primary">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->

        <el-dialog :visible.sync="dialog_img_visible">
            <img width="100%" height="100%" :src="dialog_image_url" alt="">
        </el-dialog>

    </div>

</template>

<script>

    import {getProductInfo} from "@/http/product/show";

    export default {
        name: "ProductShow",
        data() {
            return {
                data: {},
                dialog_img_visible: false,
                dialog_image_url: '',
            };
        },
        created() {

            this.getProductInfo();

        },
        methods: {

            async getProductInfo() {

                getProductInfo(this.$route.query.id).then(result => {
                    console.log(result);
                    this.data = result;

                });

            },
            checkImg(img_url) {

                this.dialog_image_url = img_url;

                this.dialog_img_visible = true;

            }
        },
    };
</script>

<style scoped>
    .show {
        padding: 40px 80px 80px 80px;
        background-color: #fff;
    }

    .main-images {
        width: 70px;
        height: 65px;
    }

    .attr-div {
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

    .attr {
        width: 80px;
        margin-right: 35px;
    }


    .main-images {
        width: 70px;
        height: 65px;
    }

</style>