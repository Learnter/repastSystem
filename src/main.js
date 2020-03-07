// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from './assets/reset.css';
import { MessageBox,Form,FormItem,Input,Button,Row,Col,Icon} from 'element-ui';

MessageBox.install = function (Vue, options) {
  Vue.prototype.$confirm = MessageBox.confirm;
}
Vue.config.productionTip = false
Vue.use(reset);
Vue.use(MessageBox);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
