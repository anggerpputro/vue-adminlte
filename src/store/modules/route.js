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
		localStorage.setItem(
			configApp.localStoragePrefix + "userRoutes",
			JSON.stringify(value)
		);
	}
};

const actions = {
	getUserRoutes({ commit }, authData) {
		commit("setRoutesGenerated", false);
		return new Promise((resolve, reject) => {
			const tokenType = authData.token_type;
			const token = authData.access_token;

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
