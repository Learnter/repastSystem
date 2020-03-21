// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from './assets/reset.css';
import https from "./axios/https";
import api from "./axios/interface";
import './assets/iconfont/iconfont.css'
import {MessageBox,Message,Form,FormItem,Input,Button,Row,Col,Icon,Checkbox,CheckboxGroup,Radio,Dialog,InfiniteScroll,Select,Option,Loading,Badge,Drawer} from 'element-ui';

MessageBox.install = function (Vue, options) {
  Vue.prototype.$message = MessageBox;
}

Message.install = function (Vue, options) {
  Vue.prototype.$note = Message;
}

Loading.install = function (Vue, options) {
  Vue.prototype.$loading = Loading;
}
Vue.config.productionTip = false
Vue.use(reset);
Vue.use(MessageBox);
Vue.use(Message);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(InfiniteScroll);
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);
Vue.use(Badge);
Vue.use(Drawer);
Vue.prototype.$https = https;
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
