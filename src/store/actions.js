import Vue from "vue";

export const loadData = ({ commit }) => {
	Vue.http
		.get("data.json")
		.then(response => response.json())
		.then(data => {
			const funds = data.funds;
			const portofolio = data.portofolio;
			const stocks = data.stocks;

			commit("stocks/setStocks", stocks);
			commit("portofolio/setPortofolio", {
				funds,
				stocks: portofolio
			});
		});
};
