import stocks from "@/data/stocks";

const state = {
	stocks: []
};

const mutations = {
	setStocks(state, stocks) {
		state.stocks = stocks;
	},
	rndStocks(state) {
		state.stocks.forEach(stock => {
			let randFactors = 3 * Math.random() - 1;
			if (stock.price <= 0) {
				stock.price = 1;
			}
			stock.price += Math.round(stock.price * randFactors);
		});
	}
};

const actions = {
	buyStock: ({ commit }, order) => {
		commit("portofolio/buyStock", order, { root: true });
	},
	initStocks: ({ commit }) => {
		commit("setStocks", stocks);
	},
	randomizeStocks: ({ commit }) => {
		commit("rndStocks");
	}
};

const getters = {
	stocks: state => state.stocks
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
