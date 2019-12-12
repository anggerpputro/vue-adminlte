import Vue from "vue";

import router from "./router";
import store from "./store/store";

import axios from "axios";
import AmCharts from "amcharts3";
import AmSerial from "amcharts3/amcharts/serial";

import App from "./App.vue";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "https://vue-stock-analyzer.firebaseio.com/";
// axios.defaults.baseURL = "http://localhost:8099/api/"; // java
axios.defaults.baseURL = "http://localhost:81/pdampengaduan/api/"; // laravel

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

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
