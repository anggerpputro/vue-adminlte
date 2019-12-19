import Vue from "vue";
import Vuex from "vuex";

import * as mutations from "./mutations";
import * as actions from "./actions";

import auth from "./modules/auth";
import route from "./modules/route";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showGlobalLoader: false
	},
	mutations,
	actions,
	getters: {
		showGlobalLoader: state => state.showGlobalLoader
	},
	modules: {
		auth,
		route
	}
});
