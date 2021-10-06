<template>
    <div>
        这是首页
    </div>
</template>


<script>
    import {getToken} from "@/utils/token";

    export default {
        name: "HomeIndex",
        data() {
            return {
                path: "ws:" + process.env.VUE_APP_BASE_url + process.env.VUE_APP_WS_PATH,
                socket: "",
            }
        },
        mounted() {

            //浏览器关闭或者刷新的时候 关闭websocket连接
            window.addEventListener('beforeunload', (e) => this.close());

            // 初始化
            this.init()
        },
        methods: {

            init: function () {

                if (typeof (WebSocket) === "undefined") {
                    alert("您的浏览器不支持socket");
                } else {

                    // 实例化socket
                    this.socket = new WebSocket(this.path + '?token=' + getToken());

                    // 监听socket连接
                    this.socket.onopen = this.open;

                    // 监听socket消息
                    this.socket.onmessage = this.getMessage;

                }
            },
            open: function () {
                console.log('连接上了。');
            },
            send: function (message) {

                this.socket.send(message);
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


    window.onbeforeunload = function (e) {
        e = e || window.event;

        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '关闭提示';
        }

        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
    };

</script>

<style>

</style>