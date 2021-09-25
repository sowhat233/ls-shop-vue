<template>
    <div class="product-container">

        <el-row class="top">

            <el-col class="w500">
                <el-input placeholder="请输入商品名称" v-model="query_info.query" clearable @clear="clearSearch">
                    <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
                </el-input>
            </el-col>

            <el-col class="ml30">
                <el-button type="primary" @click="goToProductAdd">添加商品</el-button>
            </el-col>

        </el-row>

        <el-table :data="table_data" row-key="key" border default-expand-all>

            <el-table-column label="编号" width="60" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" width="120" prop="category_name"></el-table-column>
            <el-table-column label="类型" width="100" prop="type">
                <template slot-scope="scope">
                    <el-popover v-if="(scope.row.is_multiple_spec)" trigger="click" placement="right"
                                class="cursor-pointer">

                        <el-table :data="scope.row.sku" max-height="800" class="sku-table">
                            <el-table-column label="属性" :width="scope.row.width"
                                             property="attrs_name"></el-table-column>
                            <el-table-column label="销量" width="100" property="sales" sortable></el-table-column>
                            <el-table-column label="售价" width="100" property="price" sortable></el-table-column>
                            <el-table-column label="进价" width="100" property="cost_price" sortable></el-table-column>
                        </el-table>

                        <div slot="reference">
                            <el-tag effect="dark" size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                    </el-popover>

                    <el-tag v-else effect="plain" size="medium">{{ scope.row.type }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="库存" width="160" sortable prop="stock"></el-table-column>
            <el-table-column label="销量" width="160" sortable prop="sales"></el-table-column>
            <el-table-column label="售价" width="160" sortable prop="price"></el-table-column>
            <el-table-column label="进价" width="160" sortable prop="cost_price"></el-table-column>

            <el-table-column label="状态" width="160">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_launched"
                               :active-value="1"
                               :inactive-value="0"
                               active-text="上架"
                               inactive-text="下架"
                               @change="changeStatus(scope.row.id)">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column width="250" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleClick(scope.$index, scope.row.id)">查看
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="pagination-div">
            <el-pagination background layout="prev, pager, next" :page-size="15"
                           :total="page_total" @current-change="handleCurrentChange">
            </el-pagination>
        </div>


    </div>
</template>

<script>

    import {getProductList, changeStatus} from "@/http/product";

    export default {
        name: "ProductIndex",
        data() {
            return {
                query_info: {
                    'query': '',
                    'page': 1,// 7 对 185
                },
                attr_width: 14.5, //多规格的属性名的table-column默认长度
                // table_data: [],
                table_data: [],
                page_total: 0,
            };
        },
        created() {

            this.getProductList();
            console.log(this.table_data);
        },
        methods: {

            async getProductList() {
                getProductList(this.query_info).then(result => {

                    if (result.code === 200) {

                        this.table_data = this.handleProductData(result.data.data);
                        this.page_total = result.data.total;

                    } else {

                        this.$message({
                            type: 'warning',
                            message: '请求失败！',
                            duration: 5000
                        });

                    }


                });
            },
            handleProductData(product_list) {

                let text_length = [];

                for (let item of product_list) {

                    text_length = [];

                    for (let index in item.sku) {

                        let attrs_name = item.sku[index].attrs.join('，');

                        item.sku[index]['attrs_name'] = attrs_name;

                        text_length.push(attrs_name.length);

                    }
                    //sku属性table-column的长度
                    item.width = Math.max(...text_length) * this.attr_width;
                }

                return product_list;

            },
            //搜索
            searchProduct() {

                this.query_info.page = 1;

                this.getProductList();

            },
            //清除搜索条件
            clearSearch() {

                this.query_info.query = '';
                this.query_info.page = 1;

                this.getProductList();

            },
            handleCurrentChange(value) {

                this.query_info.page = value;

                this.getProductList();

            },
            handleClick(index, id) {

                console.log(index, id);

                let url = this.$router.resolve({
                    name: 'ProductShow',
                    query: {
                        id: id,
                    }
                });

                window.open(url.href, '_blank');

            },
            handleEdit(index, id) {

                this.$router.push({
                    name: 'ProductEdit',
                    query: {
                        id: id,
                    }
                });

            },
            handleDelete(index, id) {

                //警告提示弹窗
                this.$confirm('确定删除?', '警告', {

                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',

                }).then(() => { //点击确定的操作

                    console.log(index, id);

                });

            },
            goToProductAdd() {

                this.$router.push({
                    name: 'ProductAdd',
                });

            },
            //修改商品上/下架状态
            changeStatus(id) {

                changeStatus(id).then(result => {

                    console.log(result);

                    if (result.code === 200) {

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

        },
    };
</script>

<style scoped>
    .pagination-div {
        padding-top: 20px;
        text-align: right;
    }

    .product-container {
        padding: 10px;
        background-color: #fff;
    }

    .top {
        display: flex;
        padding: 10px 0 15px 0;
    }

    .sku-table {
        max-width: 1025px;
    }

</style>

