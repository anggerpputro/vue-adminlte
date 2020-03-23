import Vue from "vue";

import router from "./router";
import store from "./store/store";

// packages
import axios from "axios";
import vueScrollBehavior from "vue-scroll-behavior";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";

// components
import Select2 from "v-select2-component";
import Paginate from "vuejs-paginate";

import App from "./App.vue";
import "./registerServiceWorker";
import configUrl from "./config-url";

Vue.config.productionTip = false;

axios.defaults.baseURL = configUrl.apiBaseURL;

// Using vueScrollBehavior
Vue.use(vueScrollBehavior, {
	router: router, // The router instance
	maxLength: 100, // Saved history List max length
	ignore: [/\/boo/, /\/zoo/], // ignore some routes, they will directly scroll to the top
	delay: 300 // Delay by a number of milliseconds
});

// Vue Notification
Vue.use(Notifications);

// Vue Modal
Vue.use(VModal);

Vue.component("Select2", Select2);
Vue.component("paginate", Paginate);

Vue.filter("toCurrency", function(value) {
	// if (typeof value !== "number") {
	// 	return value;
	// }
	var formatter = new Intl.NumberFormat("id-ID", {
		// style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	});
	return formatter.format(value);
});

Vue.filter("bytesToSize", function(bytes) {
	var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes == 0) return "0 Byte";
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
