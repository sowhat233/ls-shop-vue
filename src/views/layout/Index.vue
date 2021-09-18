<template>

    <el-container class="layout-container">
        <!-- 左侧 -->
        <el-aside class="aside" width="200px">
            <menu-aside></menu-aside>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header class="header">
                <menu-header></menu-header>
            </el-header>

            <!-- 内容 -->
            <el-main class="main">
                <router-view/>
            </el-main>

        </el-container>
    </el-container>

</template>

<script>
    import MenuAside from './childComponets/Aside';
    import MenuHeader from './childComponets/Header';

    export default {
        name: "layoutIndex",
        components: {
            MenuAside,
            MenuHeader
        }
    };
</script>

<style scoped>
    .aside {
        background-color: #364150;
    }

    .header {
        border-bottom: 1px solid #ccc;
    }

    .main {
        background-color: #e9eef3;
    }

    .layout-container {
        height: 937px;
    }
</style>