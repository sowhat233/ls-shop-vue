<template>
    <div class="header-div">
        <div class="flex aic">
            <i class="el-icon-s-fold"></i>
            <span>ls-shop后台管理系统</span>
        </div>
        <div>
            <el-dropdown>
                <div class="avatar-div">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1385237117,2090208404&fm=26&gp=0.jpg"
                         class="avatar" alt="头像">
                    <span>用户昵称</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuHeader"
    }
</script>

<style scoped>
    .header-div {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .avatar-div {
        display: flex;
        align-items: center;
    }

    .avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .el-icon-s-fold{
        font-size: 24px;
    }

</style>