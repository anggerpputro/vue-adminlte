import axiosAuth from "@/axios-auth";
import router from "@/router";
import configUrl from "@/config-url";
import configApp from "@/config-app";

const state = {
	// redirectUri: "http://localhost/auth/callback", // stock-analyzer-client
	// logoutUri: "http://localhost:50080", // stock-analyzer-client
	// dashboardUri: "http://localhost:50080", // stock-analyzer-client
	// redirectUri: "http://192.168.1.3/auth/callback", // stock-analyzer-client
	// logoutUri: "http://192.168.1.3:8080", // stock-analyzer-client
	// dashboardUri: "http://192.168.1.3:8080", // stock-analyzer-client
	redirectUri: configUrl.vRedirectUri,
	logoutUri: configUrl.vLogoutUri,
	dashboardUri: configUrl.vDashboardUri,
	tokenType: null,
	token: null,
	refreshToken: null,
	expirationDate: null,
	userId: null,
	user: null,
	loginSuccess: {
		status: false,
		message: ""
	}
};

const mutations = {
	setAuthData(state, data) {
		// console.log(data.user.id);
		// const token = data.idToken;
		// const userId = data.localId;
		// const user = { id: data.localId, email: data.email };
		const tokenType = data.token_type;
		const token = data.access_token;
		const refreshToken =
			data.refresh_token !== undefined ? data.refresh_token : null;

		let user = data.user ? data.user : null;
		try {
			// is json
			user = JSON.parse(user); // parse to object
		} catch (e) {}

		let userId = user.id ? user.id : null;
		if (userId === null) {
			userId = user ? user.npp : null;
		}

		let expirationDate = null;

		if (data.expirationDate !== undefined) {
			expirationDate = data.expirationDate;
		} else {
			const now = new Date();
			// expirationDate = new Date(now.getTime() + data.expiresIn * 1000);
			expirationDate = new Date(now.getTime() + data.expires_in * 1000);
		}

		state.tokenType = tokenType;
		state.token = token;
		state.refreshToken = refreshToken;
		state.expirationDate = expirationDate;
		state.userId = userId;
		state.user = user;

		localStorage.setItem(
			configApp.localStoragePrefix + "tokenType",
			tokenType
		);
		localStorage.setItem(configApp.localStoragePrefix + "token", token);
		localStorage.setItem(
			configApp.localStoragePrefix + "refreshToken",
			refreshToken
		);
		localStorage.setItem(
			configApp.localStoragePrefix + "expirationDate",
			expirationDate
		);
		localStorage.setItem(configApp.localStoragePrefix + "userId", userId);
		localStorage.setItem(
			configApp.localStoragePrefix + "user",
			JSON.stringify(user)
		);
	},
	setUserData(state, userData) {
		let user = userData;
		try {
			// is json
			user = JSON.parse(user); // parse to object
		} catch (e) {}

		let userId = user ? user.npp : null;

		state.userId = userId;
		state.user = user;

		localStorage.setItem(configApp.localStoragePrefix + "userId", userId);
		localStorage.setItem(
			configApp.localStoragePrefix + "user",
			JSON.stringify(user)
		);
	},
	clearAuthData(state) {
		state.tokenType = null;
		state.token = null;
		state.refreshToken = null;
		state.expirationDate = null;
		state.userId = null;
		state.user = null;

		const localStorageItems = { ...localStorage };
		for (const lskey in localStorageItems) {
			if (lskey.startsWith(configApp.localStoragePrefix)) {
				localStorage.removeItem(lskey);
			}
		}
		// localStorage.clear();
	},
	setLoginSuccess(state, loginSuccess) {
		state.loginSuccess = loginSuccess;
	}
};

const actions = {
	cekLogin({ commit, dispatch, getters }) {
		if (getters.isAuthenticated) {
			dispatch("validateToken");

			const tokenType = localStorage.getItem(
				configApp.localStoragePrefix + "tokenType"
			);
			const token = localStorage.getItem(
				configApp.localStoragePrefix + "token"
			);
			const refreshToken = localStorage.getItem(
				configApp.localStoragePrefix + "refreshToken"
			);
			const expirationDate = localStorage.getItem(
				configApp.localStoragePrefix + "expirationDate"
			);
			const userId = localStorage.getItem(
				configApp.localStoragePrefix + "userId"
			);
			const user = localStorage.getItem(
				configApp.localStoragePrefix + "user"
			);

			commit("setAuthData", {
				token_type: tokenType,
				access_token: token,
				refresh_token: refreshToken,
				expirationDate,
				userId,
				user
			});

			// router.go({ path: "/", force: true });
		} else {
			router.go({ path: "/login", force: true });
		}
	},
	callbackLogin({ commit, getters }, query) {
		return new Promise((resolve, reject) => {
			if (
				query.token_type !== undefined &&
				query.expires_in !== undefined &&
				query.access_token !== undefined
			) {
				commit("setLoginSuccess", {
					success: true,
					message: "login success!"
				});
				commit("setAuthData", query);

				// router.push({ name: "dashboard" });
				// router.go({ path: "/dashboard", force: true });
				// window.location.replace(getters.dashboardUri);
				resolve(getters.dashboardUri);
			} else {
				reject(new Error("Response Data Error!"));
			}
		});
	},
	validateToken({ getters }) {
		if (getters.isAuthenticated) {
			const tokenType = localStorage.getItem(
				configApp.localStoragePrefix + "tokenType"
			);
			const token = localStorage.getItem(
				configApp.localStoragePrefix + "token"
			);

			const headers = {
				Accept: "application/json",
				Authorization: tokenType + " " + token
			};

			axiosAuth
				.get("/validate-token", { headers })
				.then(response => {
					const data = response.data;
					if (data.valid !== undefined && data.valid == true) {
					} else {
					}
				})
				.catch(error => {
					const response = error.response;
					if (response.status == 401) {
						// token salah / expired
					}
				});
		}
	},
	updateProfile({ getters, commit }, formData) {
		return new Promise((resolve, reject) => {
			if (getters.isAuthenticated) {
				const tokenType = localStorage.getItem(
					configApp.localStoragePrefix + "tokenType"
				);
				const token = localStorage.getItem(
					configApp.localStoragePrefix + "token"
				);

				const headers = {
					Accept: "application/json",
					Authorization: tokenType + " " + token
				};

				axiosAuth
					.post("/update-profile", formData, { headers })
					.then(response => {
						if (response.data.data) {
							commit("setUserData", response.data.data.saved);
						}
						resolve(response);
					})
					.catch(error => reject(error));
			} else {
				reject(new Error("Unauthenticated!"));
			}
		});
	},
	doLogin({ dispatch }, { email, password }) {
		// console.log("DO LOGIN", email, password);
		return new Promise((resolve, reject) => {
			axiosAuth
				.post("/login", {
					username: email,
					password
				})
				.then(response => {
					dispatch("callbackLogin", response.data.data)
						.then(resp => resolve(resp))
						.catch(e => reject(e));
				})
				.catch(error => {
					console.error(error);
					reject(error);
				});
		});
	},
	doLogout({ commit, getters }) {
		commit("clearAuthData");
		// router.go({ path: "/", force: true });
		// window.location.replace(getters.logoutUri);
		window.location.reload();
	},
	clearLocalStorage({ commit }) {
		commit("clearAuthData");
	}
};

const getters = {
	apiKey: state => state.apiKey,
	clientId: state => state.clientId,
	clientSecret: state => state.clientSecret,
	oauthUri: state => state.oauthUri,
	redirectUri: state => state.redirectUri,
	dashboardUri: state => state.dashboardUri,
	logoutUri: state => state.logoutUri,
	tokenType: state => state.tokenType,
	token: state => state.token,
	refreshToken: state => state.refreshToken,
	userId: state => state.userId,
	user: state => state.user,
	isAuthenticated: state => {
		// cek token exists
		const token = localStorage.getItem(
			configApp.localStoragePrefix + "token"
		);
		if (!token) {
			// token not exists
			return false;
		}

		// cek expiration date
		const expirationDate = new Date(
			localStorage.getItem(
				configApp.localStoragePrefix + "expirationDate"
			)
		);
		const now = new Date();
		if (now >= expirationDate) {
			// token expired
			return false;
		}

		// user logged in
		const userId = localStorage.getItem(
			configApp.localStoragePrefix + "userId"
		);
		const user = JSON.parse(
			localStorage.getItem(configApp.localStoragePrefix + "user")
		);

		return true;
	},
	loginSuccess: state => state.loginSuccess
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
