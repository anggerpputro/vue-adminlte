<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/general-fundamental"
			titleCenter="Add New General Fundamental (Multiple)"
			:showSearch="false"
		/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="form-group">
						<label for="stock_code">Stock Code:</label>
						<input
							type="text"
							class="form-control"
							id="stock_code"
							placeholder="Stock Code"
							v-model="data.stock_code"
							@input="validateStockCode"
							@keyup.enter="goToNextInput"
						/>
					</div>

					<!-- <div class="form-group">
						<label for="satuan">Satuan:</label>
						<input
							type="text"
							class="form-control"
							name="satuan"
							id="satuan"
							v-model="data.satuan"
							@keyup="maskMoney($event);oNextInput($event)"
						>
					</div>-->
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 text-center">
					<table class="table table-bordered table-striped">
						<tbody>
							<tr>
								<td>
									<a
										href="#"
										class="text-success"
										data-toggle="tooltip"
										title="Add Periode Data"
										@click.prevent="addData()"
									>
										<i class="fa fa-plus-circle"></i>
									</a>
								</td>
								<td v-for="(row, index) in data.year" :key="'data_tools'+index" class="text-center">
									<a
										href="#"
										class="text-danger"
										data-toggle="tooltip"
										title="Remove Periode Data"
										@click.prevent="removeData(index)"
									>
										<i class="fa fa-minus-circle"></i>
									</a>
								</td>
							</tr>
							<tr>
								<th>Year:</th>
								<td v-for="(year, yearIndex) in data.year" :key="'year'+yearIndex">
									<input
										type="number"
										class="form-control"
										min="0"
										maxlength="4"
										v-model="data.year[yearIndex]"
										@keyup.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>Quartal:</th>
								<td v-for="(quartal, quartalIndex) in data.quartal" :key="'quartal'+quartalIndex">
									<select
										:name="'quartal'+quartalIndex"
										:id="'quartal'+quartalIndex"
										:data-name="'quartal'"
										:data-key="quartalIndex"
										class="form-control"
										v-model="data.quartal[quartalIndex]"
										@keypress.enter="goToNextInput"
									>
										<option value="1">Q1</option>
										<option value="2">Q2</option>
										<option value="3">Q3</option>
										<option value="4">Q4</option>
									</select>
								</td>
							</tr>
							<tr>
								<th colspan="2">Stock Data:</th>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Price:</th>
								<td v-for="(price, priceIndex) in data.price" :key="'price'+priceIndex">
									<input
										type="text"
										:name="'price'+priceIndex"
										:id="'price'+priceIndex"
										:data-name="'price'"
										:data-key="priceIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.price[priceIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;O/S Share:</th>
								<td
									v-for="(o_to_s_share, o_to_s_shareIndex) in data.o_to_s_share"
									:key="'o_to_s_share'+o_to_s_shareIndex"
								>
									<input
										type="text"
										:name="'o_to_s_share'+o_to_s_shareIndex"
										:data-name="'o_to_s_share'"
										:data-key="o_to_s_shareIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.o_to_s_share[o_to_s_shareIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Market Cap:</th>
								<td
									v-for="(market_cap, market_capIndex) in data.market_cap"
									:key="'market_cap'+market_capIndex"
								>
									<input
										type="text"
										:name="'market_cap'+market_capIndex"
										:data-name="'market_cap'"
										:data-key="market_capIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.market_cap[market_capIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th colspan="2">Ratio:</th>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;P/E (x):</th>
								<td v-for="(p_to_e, p_to_eIndex) in data.p_to_e" :key="'p_to_e'+p_to_eIndex">
									<input
										type="text"
										:name="'p_to_e'+p_to_eIndex"
										:data-name="'p_to_e'"
										:data-key="p_to_eIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.p_to_e[p_to_eIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;PBV (x):</th>
								<td v-for="(pbv, pbvIndex) in data.pbv" :key="'pbv'+pbvIndex">
									<input
										type="text"
										:name="'pbv'+pbvIndex"
										:data-name="'pbv'"
										:data-key="pbvIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.pbv[pbvIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;ROA (%):</th>
								<td v-for="(roa, roaIndex) in data.roa" :key="'roa'+roaIndex">
									<input
										type="text"
										:name="'roa'+roaIndex"
										:data-name="'roa'"
										:data-key="roaIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.roa[roaIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;NPM (%):</th>
								<td v-for="(npm, npmIndex) in data.npm" :key="'npm'+npmIndex">
									<input
										type="text"
										:name="'npm'+npmIndex"
										:data-name="'npm'"
										:data-key="npmIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.npm[npmIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;ROE (%):</th>
								<td v-for="(roe, roeIndex) in data.roe" :key="'roe'+roeIndex">
									<input
										type="text"
										:name="'roe'+roeIndex"
										:data-name="'roe'"
										:data-key="roeIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.roe[roeIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;OPM (%):</th>
								<td v-for="(opm, opmIndex) in data.opm" :key="'opm'+opmIndex">
									<input
										type="text"
										:name="'opm'+opmIndex"
										:data-name="'opm'"
										:data-key="opmIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.opm[opmIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;DER (%):</th>
								<td v-for="(der, derIndex) in data.der" :key="'der'+derIndex">
									<input
										type="text"
										:name="'der'+derIndex"
										:data-name="'der'"
										:data-key="derIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.der[derIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th colspan="2">Balance Sheet:</th>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Assets:</th>
								<td v-for="(assets, assetsIndex) in data.assets" :key="'assets'+assetsIndex">
									<input
										type="text"
										:name="'assets'+assetsIndex"
										:data-name="'assets'"
										:data-key="assetsIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.assets[assetsIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Liability:</th>
								<td v-for="(liability, liabilityIndex) in data.liability" :key="'liability'+liabilityIndex">
									<input
										type="text"
										:name="'liability'+liabilityIndex"
										:data-name="'liability'"
										:data-key="liabilityIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.liability[liabilityIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Equity:</th>
								<td v-for="(equity, equityIndex) in data.equity" :key="'equity'+equityIndex">
									<input
										type="text"
										:name="'equity'+equityIndex"
										:data-name="'equity'"
										:data-key="equityIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.equity[equityIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;BV/Share:</th>
								<td
									v-for="(bv_per_share, bv_per_shareIndex) in data.bv_per_share"
									:key="'bv_per_share'+bv_per_shareIndex"
								>
									<input
										type="text"
										:name="'bv_per_share'+bv_per_shareIndex"
										:data-name="'bv_per_share'"
										:data-key="bv_per_shareIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.bv_per_share[bv_per_shareIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th colspan="2">Income Statement:</th>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Revenue:</th>
								<td v-for="(revenue, revenueIndex) in data.revenue" :key="'revenue'+revenueIndex">
									<input
										type="text"
										:name="'revenue'+revenueIndex"
										:data-name="'revenue'"
										:data-key="revenueIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.revenue[revenueIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Operating Profit:</th>
								<td
									v-for="(operating_profit, operating_profitIndex) in data.operating_profit"
									:key="'operating_profit'+operating_profitIndex"
								>
									<input
										type="text"
										:name="'operating_profit'+operating_profitIndex"
										:data-name="'operating_profit'"
										:data-key="operating_profitIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.operating_profit[operating_profitIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Net Profit:</th>
								<td
									v-for="(net_profit, net_profitIndex) in data.net_profit"
									:key="'net_profit'+net_profitIndex"
								>
									<input
										type="text"
										:name="'net_profit'+net_profitIndex"
										:data-name="'net_profit'"
										:data-key="net_profitIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.net_profit[net_profitIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;EPS:</th>
								<td v-for="(eps, epsIndex) in data.eps" :key="'eps'+epsIndex">
									<input
										type="text"
										:name="'eps'+epsIndex"
										:data-name="'eps'"
										:data-key="epsIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.eps[epsIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									/>
								</td>
							</tr>
						</tbody>
					</table>

					<div class="text-center">
						<div class="col-md-6">
							<button class="btn btn-warning" @click.prevent="resetData">
								<strong>Reset Data</strong>
							</button>
						</div>
						<div class="col-md-6">
							<button class="btn btn-success" @click.prevent="submitData">
								<strong>Submit & Add More</strong>
							</button>
						</div>
					</div>

					<div class="col-md-12" style="margin-top: 5px !important;">
						<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

						<div
							class="alert alert-danger"
							style="margin-top: 5px !important;"
							id="error-div"
							ref="errorDiv"
							v-if="errors.length > 0"
						>
							<ul>
								<li v-for="(err, i) in errors" :key="i">{{ err }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BoxHeader from "@/components/box/BoxHeader.vue";
import TableInput from "@/components/input/TableInput.vue";

import axios from "axios";

export default {
	components: {
		BoxHeader,
		TableInput
	},
	data() {
		return {
			data: {},
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			errors: [],
			gettingDataFromServer: false
		};
	},
	watch: {
		"data.stock_code": function(newVal, oldVal) {
			if (newVal.length == 4) {
				this.data.year.forEach((year, index) => {
					this.getDataFromServer(
						newVal,
						year,
						this.data.quartal[index]
					);
				});
			}
		}
	},
	created() {
		this.data = this.generateDefaultData();
	},
	mounted() {
		this.prepareMaskMoney();
	},
	methods: {
		goToNextInput(event) {
			const index = $(":input").index(event.target);
			$(":input:eq(" + (index + 1) + ")").select();
		},
		prepareMaskMoney() {
			$(document).ready(function() {
				$(".maskMoneyThisInput").maskMoney({
					prefix: "Rp ",
					thousands: ".",
					decimal: ",",
					precision: 2,
					allowZero: true,
					allowNegative: true,
					selectAllOnFocus: true
				});
			});
		},
		getDataFromServer(stock_code, year, quartal) {
			if (stock_code && year && quartal) {
				stock_code = stock_code.toUpperCase();

				this.$store.commit("showGlobalLoader", true);
				this.gettingDataFromServer = true;

				axios
					.get(
						"/general-fundamental/by-unique-field/" +
							stock_code +
							"/" +
							year +
							"/" +
							quartal
					)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);
						this.gettingDataFromServer = false;

						const responseData = response.data.data;
						this.data.year.forEach((prd, index) => {
							if (
								prd == responseData.year &&
								this.data.quartal[index] == responseData.quartal
							) {
								this.data.year[index] = responseData.year;
								this.data.quartal[index] = responseData.quartal;

								this.data.price[index] = responseData.price;
								this.data.o_to_s_share[index] =
									responseData.o_to_s_share;
								this.data.market_cap[index] =
									responseData.market_cap;

								this.data.p_to_e[index] = responseData.p_to_e;
								this.data.pbv[index] = responseData.pbv;
								this.data.npm[index] = responseData.npm;
								this.data.opm[index] = responseData.opm;
								this.data.roa[index] = responseData.roa;
								this.data.roe[index] = responseData.roe;
								this.data.der[index] = responseData.der;

								this.data.assets[index] = responseData.assets;
								this.data.liability[index] =
									responseData.liability;
								this.data.equity[index] = responseData.equity;
								this.data.bv_per_share[index] =
									responseData.bv_per_share;

								this.data.revenue[index] = responseData.revenue;
								this.data.operating_profit[index] =
									responseData.operating_profit;
								this.data.net_profit[index] =
									responseData.net_profit;
								this.data.eps[index] = responseData.eps;

								this.$forceUpdate();
							}
						});
					})
					.catch(e => {
						this.$store.commit("showGlobalLoader", false);
						this.gettingDataFromServer = false;

						// this.hasError = true;
						// this.errorMessage = e.response.data.message;
						// this.alertClass = "alert-danger";

						console.error(e);
					});
			}
		},
		generateDefaultData() {
			return {
				stock_code: "",
				year: [new Date().getFullYear().toString()],
				quartal: [1],

				price: [""],
				o_to_s_share: [""],
				market_cap: [""],

				p_to_e: [""],
				pbv: [""],
				npm: [""],
				opm: [""],
				roa: [""],
				roe: [""],
				der: [""],

				assets: [""],
				liability: [""],
				equity: [""],
				bv_per_share: [""],

				revenue: [""],
				operating_profit: [""],
				net_profit: [""],
				eps: [""]
			};
		},
		validateStockCode() {
			this.data.stock_code = this.data.stock_code.toUpperCase();
			if (this.data.stock_code.length > 4) {
				this.data.stock_code = this.data.stock_code.substring(0, 4);
			}

			// if (this.data.stock_code.length == 4) {
			// }
		},
		maskMoney(event) {
			// if (event.keyCode == 13) {
			// 	this.goToNextInput(event);
			// } else {
			// }
			const name = event.target.getAttribute("name");
			const selector = "input[name='" + name + "']";

			const variable = event.target.getAttribute("data-name");
			const key = event.target.getAttribute("data-key");
			this.data[variable][key] = $(selector).val();
		},
		removeData(index) {
			if (
				confirm(
					"Sure remove data periode: " +
						this.data.year[index] +
						" (Q" +
						this.data.quartal[index] +
						") ?"
				)
			) {
				this.data.year.splice(index, 1);
				this.data.quartal.splice(index, 1);

				this.data.price.splice(index, 1);
				this.data.o_to_s_share.splice(index, 1);
				this.data.market_cap.splice(index, 1);

				this.data.p_to_e.splice(index, 1);
				this.data.pbv.splice(index, 1);
				this.data.npm.splice(index, 1);
				this.data.opm.splice(index, 1);
				this.data.roa.splice(index, 1);
				this.data.roe.splice(index, 1);
				this.data.der.splice(index, 1);

				this.data.assets.splice(index, 1);
				this.data.liability.splice(index, 1);
				this.data.equity.splice(index, 1);
				this.data.bv_per_share.splice(index, 1);

				this.data.revenue.splice(index, 1);
				this.data.operating_profit.splice(index, 1);
				this.data.net_profit.splice(index, 1);
				this.data.eps.splice(index, 1);
			}
		},
		addData() {
			this.$forceUpdate();
			const length = this.data.year.length;
			let newYear = this.data.year[length - 1];
			let newQuartal = this.data.quartal[length - 1] + 1;

			if (newQuartal > 4) {
				newQuartal = 1;
				newYear = parseInt(newYear) + 1;
			}

			this.data.year.push(newYear);
			this.data.quartal.push(newQuartal);

			this.data.price.push("");
			this.data.o_to_s_share.push("");
			this.data.market_cap.push("");

			this.data.p_to_e.push("");
			this.data.pbv.push("");
			this.data.npm.push("");
			this.data.opm.push("");
			this.data.roa.push("");
			this.data.roe.push("");
			this.data.der.push("");

			this.data.assets.push("");
			this.data.liability.push("");
			this.data.equity.push("");
			this.data.bv_per_share.push("");

			this.data.revenue.push("");
			this.data.operating_profit.push("");
			this.data.net_profit.push("");
			this.data.eps.push("");

			this.getDataFromServer(this.data.stock_code, newYear, newQuartal);
			this.prepareMaskMoney();
		},
		validateFormData() {
			this.errors = [];
			if (!this.data.stock_code) {
				this.errors.push("Stock Code required.");
			}

			if (this.errors.length <= 0) {
				return true;
			} else {
				return false;
			}
		},
		resetData() {
			if (confirm("Sure reset data?")) {
				this.data = this.generateDefaultData();

				this.hasError = false;
				this.errorMessage = "";
				this.errors = [];
			}
		},
		submitData() {
			// console.log(this.data.basic_eps);

			if (this.validateFormData()) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post(
						"/general-fundamental/save-multiple/" +
							this.data.stock_code,
						this.data
					)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						if (
							response.data.data.length == this.data.year.length
						) {
							this.hasError = true;
							this.errorMessage =
								"General Fundamental Data Saved!";
							this.alertClass = "alert-success";
						} else {
							this.hasError = true;
							this.errorMessage = "Some data may not saved!";
							this.alertClass = "alert-danger";
						}
					})
					.catch(e => {
						this.$store.commit("showGlobalLoader", false);

						this.hasError = true;
						this.errorMessage = e.response.data.message;
						this.alertClass = "alert-danger";

						console.error(e.response.data);
					});
			}
		}
	}
};
</script>

