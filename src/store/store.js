import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
// import route from "./modules/route";

import configUrl from "@/config-url";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showGlobalLoader: false,
		scrollState: {},
		lastRoute: null,
		laravelHostname: configUrl.laravelHostname,
		apiBaseURL: configUrl.apiBaseURL,
		authBaseURL: configUrl.authBaseURL,
		vRedirectUri: configUrl.vRedirectUri,
		vLogoutUri: configUrl.vLogoutUri,
		vDashboardUri: configUrl.vDashboardUri
	},
	mutations: {
		showGlobalLoader(state, data) {
			state.showGlobalLoader = data;
		},
		scrollState(state, data) {
			state.scrollState = data;
		},
		lastRoute(state, route) {
			state.lastRoute = route;
		}
	},
	actions: {},
	getters: {
		showGlobalLoader: state => state.showGlobalLoader,
		scrollState: state => state.scrollState,
		lastRoute: state => state.lastRoute,
		laravelHostname: state => state.laravelHostname,
		apiBaseURL: state => state.apiBaseURL,
		authBaseURL: state => state.authBaseURL,
		vRedirectUri: state => state.vRedirectUri,
		vLogoutUri: state => state.vLogoutUri,
		vDashboardUri: state => state.vDashboardUri
	},
	modules: {
		auth
		// route
	}
});
