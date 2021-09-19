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

            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" width="160" prop="category_name"></el-table-column>
            <el-table-column label="类型" width="160" prop="type">
                <template slot-scope="scope">
                    <el-popover v-if="(scope.row.is_multiple_spec)" trigger="hover" placement="top">
                        <template v-for="(item,key) in scope.row.sku">
                            <div class="attr-name-wrapper">
                                <p>属性: {{ item.attrs_name }}</p>
                                <p>销量: {{ item.sales }}</p>
                                <p>售价: {{ item.price }}</p>
                                <p>进价: {{ item.cost_price }}</p>
                            </div>
                        </template>
                        <div slot="reference">
                            <el-tag effect="dark" size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                    </el-popover>
                    <div v-else>
                        <el-tag effect="plain" size="medium">{{ scope.row.type }}</el-tag>
                    </div>
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
            };
        },
        created() {

            this.getProductList();

        },
        methods: {

            async getProductList() {

                getProductList(this.query_info).then(result => {

                    console.log(result);

                    this.table_data = result.data.data;
                    this.page_total = result.data.total;

                });

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
            goToProductAdd() {

                this.$router.push({
                    name: 'ProductAdd',
                });

            },
            //修改商品上/下架状态
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

    .attr-name-wrapper {
        border-bottom: 1px solid #f4f4f4;
    }

</style>

