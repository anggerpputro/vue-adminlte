const state = {
	stocks: [],
	funds: 10000
};

const mutations = {
	buyStock(state, { stockId, quantity, stockPrice }) {
		const record = state.stocks.find(element => element.id == stockId);

		if (record) {
			record.quantity += quantity;
		} else {
			state.stocks.push({
				id: stockId,
				quantity: quantity
			});
		}

		state.funds -= quantity * stockPrice;
	},
	sellStock(state, { stockId, quantity, stockPrice }) {
		const record = state.stocks.find(element => element.id == stockId);

		if (record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}

		state.funds += quantity * stockPrice;
	},
	setPortofolio(state, portofolio) {
		state.funds = portofolio.funds;
		state.stocks = portofolio.stocks ? portofolio.stocks : [];
	}
};

const actions = {
	sellStock({ commit }, order) {
		commit("sellStock", order);
	}
};

const getters = {
	stocks(state, getters, rootState, rootGetters) {
		return state.stocks.map(stock => {
			const record = rootGetters["stocks/stocks"].find(
				element => element.id == stock.id
			);
			return {
				id: stock.id,
				quantity: stock.quantity,
				name: record.name,
				price: record.price
			};
		});
	},
	funds: state => state.funds
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
