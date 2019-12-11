<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/comprehensive-income"
			titleCenter="Add New Comprehensive Income (Multiple)"
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
						>
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
								<td v-for="(row, index) in data.periode" :key="'data_tools'+index" class="text-center">
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
								<th>Periode:</th>
								<td v-for="(periode, periodeIndex) in data.periode" :key="'periode'+periodeIndex">
									<input
										type="number"
										class="form-control"
										min="0"
										maxlength="4"
										v-model="data.periode[periodeIndex]"
										@keyup.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Satuan:</th>
								<td v-for="(satuan, satuanIndex) in data.satuan" :key="'satuan'+satuanIndex">
									<input
										type="text"
										:name="'satuan'+satuanIndex"
										:id="'satuan'+satuanIndex"
										:data-name="'satuan'"
										:data-key="satuanIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.satuan[satuanIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Revenue:</th>
								<td v-for="(revenue, revenueIndex) in data.revenue" :key="'revenue'+revenueIndex">
									<input
										type="text"
										:name="'revenue'+revenueIndex"
										:id="'revenue'+revenueIndex"
										:data-name="'revenue'"
										:data-key="revenueIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.revenue[revenueIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>COGS:</th>
								<td v-for="(cogs, cogsIndex) in data.cogs" :key="'cogs'+cogsIndex">
									<input
										type="text"
										:name="'cogs'+cogsIndex"
										:data-name="'cogs'"
										:data-key="cogsIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.cogs[cogsIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Gross Profit:</th>
								<td
									v-for="(gross_profit, gross_profitIndex) in data.gross_profit"
									:key="'gross_profit'+gross_profitIndex"
								>
									<input
										type="text"
										:name="'gross_profit'+gross_profitIndex"
										:data-name="'gross_profit'"
										:data-key="gross_profitIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.gross_profit[gross_profitIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Marketing and Selling Expenses:</th>
								<td
									v-for="(marketing_selling_expenses, marketing_selling_expensesIndex) in data.marketing_selling_expenses"
									:key="'marketing_selling_expenses'+marketing_selling_expensesIndex"
								>
									<input
										type="text"
										:name="'marketing_selling_expenses'+marketing_selling_expensesIndex"
										:data-name="'marketing_selling_expenses'"
										:data-key="marketing_selling_expensesIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.marketing_selling_expenses[marketing_selling_expensesIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;General and Administrative Expenses:</th>
								<td
									v-for="(general_administrative_expenses, general_administrative_expensesIndex) in data.general_administrative_expenses"
									:key="'general_administrative_expenses'+general_administrative_expensesIndex"
								>
									<input
										type="text"
										:name="'general_administrative_expenses'+general_administrative_expensesIndex"
										:data-name="'general_administrative_expenses'"
										:data-key="general_administrative_expensesIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.general_administrative_expenses[general_administrative_expensesIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Other Operating Income:</th>
								<td
									v-for="(other_operating_income, other_operating_incomeIndex) in data.other_operating_income"
									:key="'other_operating_income'+other_operating_incomeIndex"
								>
									<input
										type="text"
										:name="'other_operating_income'+other_operating_incomeIndex"
										:data-name="'other_operating_income'"
										:data-key="other_operating_incomeIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.other_operating_income[other_operating_incomeIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Other Operating Expenses:</th>
								<td
									v-for="(other_operating_expenses, other_operating_expensesIndex) in data.other_operating_expenses"
									:key="'other_operating_expenses'+other_operating_expensesIndex"
								>
									<input
										type="text"
										:name="'other_operating_expenses'+other_operating_expensesIndex"
										:data-name="'other_operating_expenses'"
										:data-key="other_operating_expensesIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.other_operating_expenses[other_operating_expensesIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Operating Profit:</th>
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
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Finance Income:</th>
								<td
									v-for="(finance_income, finance_incomeIndex) in data.finance_income"
									:key="'finance_income'+finance_incomeIndex"
								>
									<input
										type="text"
										:name="'finance_income'+finance_incomeIndex"
										:data-name="'finance_income'"
										:data-key="finance_incomeIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.finance_income[finance_incomeIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Finance Costs:</th>
								<td
									v-for="(finance_costs, finance_costsIndex) in data.finance_costs"
									:key="'finance_costs'+finance_costsIndex"
								>
									<input
										type="text"
										:name="'finance_costs'+finance_costsIndex"
										:data-name="'finance_costs'"
										:data-key="finance_costsIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.finance_costs[finance_costsIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Profit Before Tax:</th>
								<td
									v-for="(profit_before_tax, profit_before_taxIndex) in data.profit_before_tax"
									:key="'profit_before_tax'+profit_before_taxIndex"
								>
									<input
										type="text"
										:name="'profit_before_tax'+profit_before_taxIndex"
										:data-name="'profit_before_tax'"
										:data-key="profit_before_taxIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.profit_before_tax[profit_before_taxIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>&nbsp;&nbsp;&nbsp;&nbsp;Income Tax Expenses:</th>
								<td
									v-for="(income_tax_expense, income_tax_expenseIndex) in data.income_tax_expense"
									:key="'income_tax_expense'+income_tax_expenseIndex"
								>
									<input
										type="text"
										:name="'income_tax_expense'+income_tax_expenseIndex"
										:data-name="'income_tax_expense'"
										:data-key="income_tax_expenseIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.income_tax_expense[income_tax_expenseIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Profit:</th>
								<td v-for="(profit, profitIndex) in data.profit" :key="'profit'+profitIndex">
									<input
										type="text"
										:name="'profit'+profitIndex"
										:data-name="'profit'"
										:data-key="profitIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.profit[profitIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Comprehensive Income:</th>
								<td
									v-for="(comprehensive_income, comprehensive_incomeIndex) in data.comprehensive_income"
									:key="'comprehensive_income'+comprehensive_incomeIndex"
								>
									<input
										type="text"
										:data-name="'comprehensive_income'"
										:data-key="comprehensive_incomeIndex"
										class="form-control maskMoneyThisInput"
										:name="'comprehensive_income'+comprehensive_incomeIndex"
										v-model="data.comprehensive_income[comprehensive_incomeIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Profit to Owners:</th>
								<td
									v-for="(profit_to_owners, profit_to_ownersIndex) in data.profit_to_owners"
									:key="'profit_to_owners'+profit_to_ownersIndex"
								>
									<input
										type="text"
										:name="'profit_to_owners'+profit_to_ownersIndex"
										:data-name="'profit_to_owners'"
										:data-key="profit_to_ownersIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.profit_to_owners[profit_to_ownersIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Comprehensive Income to Owners:</th>
								<td
									v-for="(comprehensive_income_to_owners, comprehensive_income_to_ownersIndex) in data.comprehensive_income_to_owners"
									:key="'comprehensive_income_to_owners'+comprehensive_income_to_ownersIndex"
								>
									<input
										type="text"
										:name="'comprehensive_income_to_owners'+comprehensive_income_to_ownersIndex"
										:data-name="'comprehensive_income_to_owners'"
										:data-key="comprehensive_income_to_ownersIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.comprehensive_income_to_owners[comprehensive_income_to_ownersIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
								</td>
							</tr>
							<tr>
								<th>Basic EPS:</th>
								<td v-for="(basic_eps, basic_epsIndex) in data.basic_eps" :key="'basic_eps'+basic_epsIndex">
									<input
										type="text"
										:name="'basic_eps'+basic_epsIndex"
										:data-name="'basic_eps'"
										:data-key="basic_epsIndex"
										class="form-control maskMoneyThisInput"
										v-model="data.basic_eps[basic_epsIndex]"
										@keyup="maskMoney"
										@keypress.enter="goToNextInput"
									>
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
				this.data.periode.forEach((prd, index) => {
					this.getDataFromServer(newVal, prd);
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
					precision: 0,
					allowZero: true,
					allowNegative: true,
					selectAllOnFocus: true
				});
			});
		},
		getDataFromServer(stock_code, periode) {
			if (stock_code && periode) {
				stock_code = stock_code.toUpperCase();

				this.$store.commit("showGlobalLoader", true);
				this.gettingDataFromServer = true;

				axios
					.get(
						"/comprehensive-income/stock/" +
							stock_code +
							"/periode/" +
							periode
					)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);
						this.gettingDataFromServer = false;

						const responseData = response.data;
						this.data.periode.forEach((prd, index) => {
							if (prd == responseData.periode) {
								this.data.satuan[index] = responseData.satuan;
								this.data.periode[index] = responseData.periode;
								this.data.revenue[index] = responseData.revenue;
								this.data.cogs[index] = responseData.cogs;
								this.data.gross_profit[index] =
									responseData.gross_profit;
								this.data.marketing_selling_expenses[index] =
									responseData.marketing_selling_expenses;
								this.data.general_administrative_expenses[
									index
								] =
									responseData.general_administrative_expenses;
								this.data.other_operating_income[index] =
									responseData.other_operating_income;
								this.data.other_operating_expenses[index] =
									responseData.other_operating_expenses;
								this.data.operating_profit[index] =
									responseData.operating_profit;
								this.data.finance_income[index] =
									responseData.finance_income;
								this.data.finance_costs[index] =
									responseData.finance_costs;
								this.data.profit_before_tax[index] =
									responseData.profit_before_tax;
								this.data.income_tax_expense[index] =
									responseData.income_tax_expense;
								this.data.profit[index] = responseData.profit;
								this.data.comprehensive_income[index] =
									responseData.comprehensive_income;
								this.data.profit_to_owners[index] =
									responseData.profit_to_owners;
								this.data.comprehensive_income_to_owners[
									index
								] = responseData.comprehensive_income_to_owners;
								this.data.basic_eps[index] =
									responseData.basic_eps;

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
				periode: [new Date().getFullYear().toString()],
				satuan: [""],

				revenue: [""],
				cogs: [""],
				gross_profit: [""],

				marketing_selling_expenses: [""],
				general_administrative_expenses: [""],
				other_operating_income: [""],
				other_operating_expenses: [""],

				operating_profit: [""],

				finance_income: [""],
				finance_costs: [""],

				profit_before_tax: [""],

				income_tax_expense: [""],

				profit: [""],
				comprehensive_income: [""],

				profit_to_owners: [""],
				comprehensive_income_to_owners: [""],

				basic_eps: [""]
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
						this.data.periode[index] +
						" ?"
				)
			) {
				this.data.periode.splice(index, 1);
				this.data.satuan.splice(index, 1);

				this.data.revenue.splice(index, 1);
				this.data.cogs.splice(index, 1);
				this.data.gross_profit.splice(index, 1);

				this.data.marketing_selling_expenses.splice(index, 1);
				this.data.general_administrative_expenses.splice(index, 1);
				this.data.other_operating_income.splice(index, 1);
				this.data.other_operating_expenses.splice(index, 1);

				this.data.operating_profit.splice(index, 1);

				this.data.finance_income.splice(index, 1);
				this.data.finance_costs.splice(index, 1);

				this.data.profit_before_tax.splice(index, 1);

				this.data.income_tax_expense.splice(index, 1);

				this.data.profit.splice(index, 1);
				this.data.comprehensive_income.splice(index, 1);

				this.data.profit_to_owners.splice(index, 1);
				this.data.comprehensive_income_to_owners.splice(index, 1);

				this.data.basic_eps.splice(index, 1);
			}
		},
		addData() {
			const length = this.data.periode.length;
			const newPeriode = this.data.periode[length - 1] - 1;
			const newSatuan = this.data.satuan[length - 1];

			this.data.periode.push(newPeriode);
			this.data.satuan.push(newSatuan);

			this.data.revenue.push("");
			this.data.cogs.push("");
			this.data.gross_profit.push("");

			this.data.marketing_selling_expenses.push("");
			this.data.general_administrative_expenses.push("");
			this.data.other_operating_income.push("");
			this.data.other_operating_expenses.push("");

			this.data.operating_profit.push("");

			this.data.finance_income.push("");
			this.data.finance_costs.push("");

			this.data.profit_before_tax.push("");

			this.data.income_tax_expense.push("");

			this.data.profit.push("");
			this.data.comprehensive_income.push("");

			this.data.profit_to_owners.push("");
			this.data.comprehensive_income_to_owners.push("");

			this.data.basic_eps.push("");

			this.getDataFromServer(this.data.stock_code, newPeriode);
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
						"/comprehensive-income/save-multiple/" +
							this.data.stock_code,
						this.data
					)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						if (
							response.data.data.length ==
							this.data.periode.length
						) {
							this.hasError = true;
							this.errorMessage =
								"Comprehensive Income Data Saved!";
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

