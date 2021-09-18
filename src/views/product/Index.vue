<template>
    <div class="product-container">

        <el-row class="top">

            <el-col class="w500">
                <el-input
                        placeholder="请输入商品名称"
                        v-model="query_info.query"
                        clearable @clear="clearSearch">
                    <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
                </el-input>
            </el-col>

            <el-col class="ml30">
                <el-button type="primary" @click="goProductAdd">添加商品</el-button>
            </el-col>

        </el-row>

        <el-table :data="table_data" row-key="key" border
                  default-expand-all :tree-props="{children: 'sku', hasChildren: 'hasChildren'}">

            <el-table-column prop="key" label="编号" width="160"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="category_name" label="所属分类" width="160"></el-table-column>
            <el-table-column sortable prop="stock" label="库存" width="160"></el-table-column>
            <el-table-column sortable prop="sales" label="销量" width="160"></el-table-column>
            <el-table-column sortable prop="price" label="售价" width="160"></el-table-column>


            <el-table-column width="160" label="状态">
                <template slot-scope="scope" v-if="scope.row.sale_status!==undefined">
                    <el-switch v-model="scope.row.sale_status"
                               :active-value="1"
                               :inactive-value="0"
                               active-text="上架"
                               inactive-text="下架"
                               @change="changeStatus(scope.row)">
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

        <el-pagination background layout="prev, pager, next" :page-size="15"
                       :total="page_total" @current-change="handleCurrentChange">
        </el-pagination>

    </div>
</template>

<script>

    import {getProductList} from "@/http/product/list";
    import {changeStatus} from "@/http/product/changeStatus";

    export default {
        name: "ProductIndex",
        data() {
            return {
                query_info: {
                    'query': '',
                    'page': 1,
                },
                table_data: [],
                page_total: 0,
                test: 1,
            };
        },
        created() {

            this.getProductList();

        },
        methods: {

            async getProductList() {

                getProductList(this.query_info).then(result => {

                    console.log(result);

                    this.table_data = result.data;
                    this.page_total = result.meta.total;

                });

            },
            searchProduct() {

                this.query_info.page = 1;

                this.getProductList();

            },
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

                console.log(index, id);

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
            goProductAdd() {

                this.$router.push({
                    name: 'ProductAdd',
                });

            },
            changeStatus(id) {

                changeStatus(id).then(result => {

                    console.log(result);

                    if (result.code === 204) {

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

            }

        },
    };
</script>

<style scoped>

    .product-container {
        padding: 10px;
        background-color: #fff;
    }

    .top {
        display: flex;
        padding: 10px 0 15px 0;
    }

    .el-pagination {
        padding: 20px 50px 10px 0;
    }
</style>