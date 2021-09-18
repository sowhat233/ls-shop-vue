import Vue from 'vue';
import App from './App';
import Router from './router/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Folding from './utils/folding.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Folding);

import "./assets/icon/iconfont.css";
import "./assets/css/normalize.css";
import "./assets/css/base.css";

new Vue({
    router: Router,
    render: h => h(App),
}).$mount('#app');
