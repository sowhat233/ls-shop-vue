<template>
    <el-menu default-active="/" class="el-menu-vertical-demo" router>
        <el-menu-item index="/">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/orders">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
        </el-menu-item>

        <el-submenu index="/product">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/category/">商品分类</el-menu-item>
                <el-menu-item index="/product/">商品列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/user">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/user/">网站设置</el-menu-item>
                <el-menu-item index="/user/">内容设置</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/setting">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统设置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/setting/">网站设置</el-menu-item>
                <el-menu-item index="/setting/">内容设置</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>

<script>
    export default {
        name: "MenuAside"
    };
</script>

<style scoped>

    .el-submenu, .el-menu-item {
        --menu-border-left: 2px solid #1caf9a;
        --menu-item-bc: rgba(0, 0, 0, .1);
        --menu-item-color: #fff;
        color: #ABB1B7;
    }

    .el-menu {
        border-right: unset;
        background-color: #364150;
    }

    .el-menu-item.is-active {
        color: var(--menu-item-color);
        background-color: var(--menu-item-bc);
        border-left: var(--menu-border-left);
    }

</style>

<style type="text/css">

    .el-submenu .el-menu--inline {
        background-color: rgba(0, 0, 0, .15);
    }

    .el-submenu .el-menu-item, .el-submenu .el-submenu__title {
        color: #ABB1B7;
    }

    .el-menu-item-group .el-menu-item-group__title {
        padding: 0;
    }

    .el-submenu__title:hover,
    .el-menu-item:focus,
    .el-menu-item:hover {
        outline: 0;
        color: var(--menu-item-color);
        background-color: var(--menu-item-bc);
        border-left: var(--menu-border-left)
    }

</style>