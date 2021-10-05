import Vue from 'vue';
import App from './App';
import Router from './router/router';
import ElementUI from 'element-ui';
import Folding from './utils/folding.js'

import "./assets/icon/iconfont.css";
import "./assets/css/normalize.css";
import "./assets/css/base.css";
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.use(Folding);



new Vue({
    router: Router,
    render: h => h(App),
}).$mount('#app');


Vue.config.productionTip = false;
