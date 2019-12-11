import Vue from "vue";
import Router from "vue-router";

import store from "@/store/store";

import AdminPage from "@/templates/AdminPage.vue";
import LoginPage from "@/templates/LoginPage.vue";
import LoginOauthPage from "@/templates/LoginOauthPage.vue";

import Dashboard from "@/views/Admin/Dashboard.vue";

// import Stock from "./views/MasterData/Stock.vue";
// import AllStock from "./views/MasterData/Stock/AllStock.vue";
// import InputStock from "./views/MasterData/Stock/InputStock.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "adminPage",
			components: {
				default: AdminPage,
				contentNoAnimation: Dashboard
			},
			beforeEnter: (to, from, next) => {
				if (store.getters["auth/isAuthenticated"]) {
					next();
				} else {
					next("/login");
				}
			},
			children: [
				{
					path: "dashboard",
					name: "dashboard",
					component: Dashboard
				}
			]
		},
		{
			path: "/login",
			name: "login",
			component: LoginPage,
			beforeEnter: (to, from, next) => {
				if (store.getters["auth/isAuthenticated"]) {
					next("/");
				} else {
					next();
					// next("/oauth");
				}
			}
		},
		{
			path: "/oauth",
			name: "oauth",
			component: LoginOauthPage
		},
		{
			path: "/auth/callback",
			name: "authCallback",
			component: LoginOauthPage
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "./views/About.vue")
		}
	]
});
