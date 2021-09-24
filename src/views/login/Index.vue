<template>
    <div class="login-container">

        <el-form :model="form" :rules="rules" ref="login_form" class="login-form">

            <div class="login-head">
                <div class="">后台登录</div>
            </div>

            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button class="login-btn" type="primary" :loading="loading" @click="onLogin('login_form')">登录
                </el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {login} from "@/http/login/login";
    import {getToken} from "@/utils/token";

    export default {
        name: 'loginIndex',
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                },
                loading: false,
            };
        },
        methods: {

            onLogin(ref) {

                this.$refs[ref].validate((valid) => {

                    if (valid) {

                        this.loading = true;

                        const form_data = this.form;

                        login(form_data).then(result => {

                            console.log(result);

                            if (result.code === 200) {

                                this.$message({
                                    'message': '登录成功!',
                                    'type': 'success',
                                });

                                window.localStorage.setItem('token', JSON.stringify(result.data));

                                this.$router.push({
                                    name: 'HomeIndex',
                                });

                            } else {

                                this.$message.error({
                                    'message': '登录失败 请稍后重试!',
                                });

                            }


                        });

                        this.loading = false;

                    } else {

                        console.log('表单验证不通过!');

                        return false;
                    }
                });
            },
        },
        created() {

            //如果有token 说明已登录
            if (getToken()) {

                //重定向
                window.location.href = "#/";

            }

        },
    };
</script>

<style scoped>

    .login-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        /*background: url("@/assets/images/login_bg.png");*/
        background: url("../../assets/images/login_bg.png");
        background-size: cover;
    }

    .login-head {
        width: 100%;
        height: 60px;
        font-size: 30px;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        background-color: #fff;
        padding: 50px;
        min-width: 300px;
    }

    .login-btn {
        width: 100%;
    }
</style>
