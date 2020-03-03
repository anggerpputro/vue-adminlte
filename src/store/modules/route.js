import axios from "axios";
import router from "@/router";
import configApp from "@/config-app";

const state = {
	routesGenerated: false,
	userRoutes: []
};

const mutations = {
	setRoutesGenerated(state, value) {
		state.routesGenerated = value;
	},
	setUserRoutes(state, value) {
		state.userRoutes = value;
		const key = configApp.localStoragePrefix + "userRoutes";

		localStorage.removeItem(key);
		localStorage.setItem(key, JSON.stringify(value));
	}
};

const actions = {
	getUserRoutes({ commit, rootGetters }) {
		commit("setRoutesGenerated", false);
		return new Promise((resolve, reject) => {
			if (rootGetters["auth/isAuthenticated"]) {
				const tokenType = rootGetters["auth/tokenType"];
				const token = rootGetters["auth/token"];

				const headers = {
					Accept: "application/json",
					Authorization: tokenType + " " + token
				};

				axios
					.get("/sidebar-menu/mine", {
						headers
					})
					.then(response => {
						commit("setUserRoutes", response.data.data);
						commit("setRoutesGenerated", true);
						resolve(response);
					})
					.catch(err => reject(err));
			} else {
				reject("Unauthenticated!");
			}
		});
	}
};

const getters = {
	userRoutes: state => {
		const userRoutes = localStorage.getItem(
			configApp.localStoragePrefix + "userRoutes"
		);
		// commit("userRoutes", userRoutes);
		return JSON.parse(userRoutes);
	},
	isRoutesGenerated: state => state.routesGenerated
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
