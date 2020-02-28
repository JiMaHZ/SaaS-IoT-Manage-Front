import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import store from './store';
import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import {
    iconfontUrl,
    iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';

import basicContainer from './components/basic-container/main'

// import VueAMap from 'vue-amap';

// Vue.config.productionTip = false
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'd3781f735fcd6c3c4417f90ba2fa5764',
// //   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',],
//   plugin: [
//     'AMap.Autocomplete', 
//     'AMap.PlaceSearch', // POI搜索插件
//     'AMap.Scale', // 右下角缩略图插件 比例尺
//     'AMap.OverView', 
//     'AMap.ToolBar', // 地图工具条
//     'AMap.MapType', 
//     'AMap.PolyEditor', 
//     'AMap.CircleEditor',// 圆形编辑器插件
//     'AMap.Geolocation'// 定位控件，用来获取和展示用户主机所在的经纬度位置
//  ],
//   v: '1.4.15'
// });

Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
    i18n: (key, value) => i18n.t(key, value)
})
//注册全局容器
Vue.component('basicContainer', basicContainer)
// 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')