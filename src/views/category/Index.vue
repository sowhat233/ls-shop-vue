<template>
    <div class="category-container">

        <el-row class="top">

            <el-col class="w500">
                <el-input
                        placeholder="请输入分类名称"
                        v-model="query_info.query"
                        clearable @clear="clearSearch">
                    <el-button slot="append" icon="el-icon-search" @click="searchCategory"></el-button>
                </el-input>
            </el-col>

            <el-col class="ml30">

                <el-button type="primary" @click="goCategoryAdd">添加分类</el-button>

            </el-col>

        </el-row>


        <el-table
                :data="table_data"
                border
                default-expand-all>
            <el-table-column
                    prop="id"
                    label="编号"
                    width="160">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="名称">
            </el-table-column>

            <el-table-column
                    prop="description"
                    label="描述">
            </el-table-column>

            <el-table-column width="250" label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="15"
                :total="page_total"
                @current-change="handleCurrentChange">
        </el-pagination>

    </div>
</template>

<script>

    import {getCategoryPaginate} from "@/http/category/paginate";
    import {CategoryDelete} from "@/http/category/delete";

    export default {
        name: "CategoryIndex",
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

            this.getCategoryList();

        },
        methods: {

            async getCategoryList() {

                getCategoryPaginate(this.query_info).then(result => {

                    console.log('getCategoryList', result);

                    this.table_data = result.data;
                    this.page_total = result.meta.total;

                });

            },
            searchCategory() {

                this.query_info.page = 1;

                this.getCategoryList();

            },
            clearSearch() {

                this.query_info.query = '';

                this.getCategoryList();

            },
            handleCurrentChange(value) {

                this.query_info.page = value;

                this.getCategoryList();

            },
            handleClick(index, row) {

                console.log(index, row.id);

            },
            handleEdit(index, row) {

                console.log(index, row.id);

                this.$router.push({
                    name: 'CategoryEdit',
                    query: {
                        id: row.id,
                    }
                });

            },
            handleDelete(index, row) {

                //警告提示弹窗
                this.$confirm('确定删除?', '警告', {

                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',

                }).then(() => { //点击确定的操作

                    console.log(index, row.id);

                    CategoryDelete(row.id).then(result => {

                        if (result.code === 204) {

                            this.$message({
                                'message': '删除成功!',
                                'type': 'success',
                            });

                            this.table_data.splice(index, 1);
                        }


                    });

                });

            },
            goCategoryAdd() {

                this.$router.push({
                    name: 'CategoryAdd',
                });

            },

        },
    };
</script>

<style scoped>

    .category-container {
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