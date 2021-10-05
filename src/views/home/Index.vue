<template>
    <div>
        这是首页
    </div>
</template>

<script>
    export default {
        name: "HomeIndex",
        data() {
            return {
                path: "ws:" + process.env.VUE_APP_BASE_url + process.env.VUE_APP_WS_PATH,
                socket: ""
            }
        },
        mounted() {
            // 初始化
            this.init()
        },
        methods: {
            init: function () {

                if (typeof (WebSocket) === "undefined") {
                    alert("您的浏览器不支持socket");
                } else {

                    // 实例化socket
                    this.socket = new WebSocket(this.path);

                    // 监听socket消息
                    this.socket.onmessage = this.getMessage;
                }
            },
            getMessage: function (msg) {

                this.$alert('您有一条新的订单!!', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: (action) => {

                        this.$router.push({
                            name: 'ProductIndex',
                        });

                    }
                });

            },
            close: function () {
                console.log("socket已经关闭");
            },

        },
        destroyed() {
            // 销毁监听
            this.socket.onclose = this.close
        }
    }
</script>

<style>

</style>