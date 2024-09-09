import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import vuetify from '@/vuetify/vuetify'
import {Html5QrcodeScanner} from "html5-qrcode"
import uiConfig from './helpers/uiConfig.js'
import PGSHelper from './helpers/PGSHelper.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import * as Sentry from "@sentry/vue";

import _ from 'lodash';
import './registerServiceWorker'
var pgsHelper = new PGSHelper(new Vue);
window.popStateDetected = false
window.addEventListener('popstate', () => {
  window.popStateDetected = true
})

Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.use(VueSweetalert2);

Vue.component('qrcode-scanner', {
  props: {
    qrbox: {
      type: Number,
      default: 250
    },
    fps: {
      type: Number,
      default: 10
    },
  },
  template: `<div id="qr-code-full-region"></div>`,
  mounted () {
    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
    };
    const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
    html5QrcodeScanner.render(this.onScanSuccess);
  },
  methods: {
    onScanSuccess (decodedText, decodedResult) {
      this.$emit('result', decodedText, decodedResult);
    }
  }
});

Vue.prototype.$uiConfig = uiConfig;
Object.defineProperty(Vue.prototype, '$pgsHelper', { value: pgsHelper });

Object.defineProperty(Vue.prototype, '$_', { value: _ });

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
