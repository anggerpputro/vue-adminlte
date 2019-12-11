<template>
	<div class="box box-primary">
		<BoxHeader titleCenter="Compare Common Sizing (Comprehensive Income)" :showSearch="false">
			<button
				style="margin-left: 5px !important; margin-right: 5px !important"
				class="btn btn-success btn-sm pull-left"
				@click="addStockToCompare"
			>
				<strong>
					<i class="fa fa-plus-circle"></i> Add Stock to Compare
				</strong>
			</button>

			<router-link to="/common-sizing-comprehensive-income/ranking">
				<a
					style="margin-left: 5px !important; margin-right: 5px !important"
					class="btn btn-primary btn-sm pull-right"
					href
				>
					<strong>
						<i class="fa fa-sort-amount-desc"></i> Ranking
					</strong>
				</a>
			</router-link>
		</BoxHeader>

		<div class="box-body">
			<div class="row">
				<div class="col-md-6" v-for="(stock, stockIndex) in data" :key="stockIndex">
					<div class="box box-primary">
						<div class="box-header">
							<div class="box-tools">
								<a
									href="#"
									class="text-danger pull-right"
									data-toggle="tooltip"
									title="Remove Stock"
									@click.prevent="removeStockToCompare(stockIndex)"
								>
									<i class="fa fa-times-circle"></i>
								</a>
							</div>
						</div>
						<div class="box-body no-padding">
							<div class="row">
								<div class="col-md-offset-2 col-md-8">
									<div class="form-group">
										<label>Stock Code:</label>
										<input
											type="text"
											class="form-control"
											placeholder="Stock Code"
											v-model="data[stockIndex].stock_code"
											@keyup="validateStockCode(stockIndex)"
										>
									</div>
								</div>
							</div>

							<div class="table-responsive">
								<table class="table table-bordered table-striped">
									<tbody>
										<tr>
											<th>Stock Name</th>
											<td :colspan="stock.periode.length">{{ stock.stock_data.name }}</td>
										</tr>
										<tr>
											<th>Sector</th>
											<td :colspan="stock.periode.length">{{ stock.stock_data.sector }}</td>
										</tr>
										<tr>
											<th>Sub-Sector</th>
											<td :colspan="stock.periode.length">{{ stock.stock_data.sub_sector }}</td>
										</tr>
										<tr v-if="stock.stock_code && stock.stock_code.length == 4">
											<td class="text-center">
												<a
													href="#"
													class="text-success"
													data-toggle="tooltip"
													title="Add Periode"
													@click.prevent="addPeriode(stockIndex)"
												>
													<i class="fa fa-plus-circle"></i> Add Periode
												</a>
											</td>
											<td v-for="(row, index) in stock.periode" :key="'data_tools'+index" class="text-center">
												<a
													href="#"
													class="text-danger"
													data-toggle="tooltip"
													title="Remove Periode"
													@click.prevent="removePeriode(stockIndex, index)"
												>
													<i class="fa fa-minus-circle"></i> Remove Periode
												</a>
											</td>
										</tr>
										<tr>
											<th>Periode</th>
											<td
												v-for="(periode, periodeIndex) in stock.periode"
												:key="periodeIndex"
												class="text-center"
											>
												<input
													type="text"
													class="form-control"
													v-model="data[stockIndex].periode[periodeIndex]"
													@keyup.enter="getCommonSizing(stockIndex, periodeIndex)"
													:disabled="!stock.stock_code || stock.stock_code.length != 4"
												>
											</td>
										</tr>
										<tr>
											<th>Revenue</th>
											<td
												v-for="(revenue, revenueIndex) in stock.revenue"
												:key="revenueIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney :width="'80%'" :money="revenue*data[stockIndex].satuan[revenueIndex]"/>
															<th class="text-right">{{ stock.revenue_percent[revenueIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<th>COGS</th>
											<td v-for="(cogs, cogsIndex) in stock.cogs" :key="cogsIndex" class="no-padding">
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney :width="'80%'" :money="cogs*data[stockIndex].satuan[cogsIndex]"/>
															<th class="text-right bg-warning disabled">{{ stock.cogs_percent[cogsIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<th>Gross Profit</th>
											<td
												v-for="(gross_profit, gross_profitIndex) in stock.gross_profit"
												:key="gross_profitIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="gross_profit*data[stockIndex].satuan[gross_profitIndex]"
															/>
															<th class="text-right">{{ stock.gross_profit_percent[gross_profitIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>Marketing and Selling Expenses</td>
											<td
												v-for="(marketing_selling_expenses, marketing_selling_expensesIndex) in stock.marketing_selling_expenses"
												:key="marketing_selling_expensesIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="marketing_selling_expenses*data[stockIndex].satuan[marketing_selling_expensesIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.marketing_selling_expenses_percent[marketing_selling_expensesIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>General and Administration Expenses</td>
											<td
												v-for="(general_administrative_expenses, general_administrative_expensesIndex) in stock.general_administrative_expenses"
												:key="general_administrative_expensesIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="general_administrative_expenses*data[stockIndex].satuan[general_administrative_expensesIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.general_administrative_expenses_percent[general_administrative_expensesIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>Other Expenses</td>
											<td
												v-for="(other_operating_expenses, other_operating_expensesIndex) in stock.other_operating_expenses"
												:key="other_operating_expensesIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="other_operating_expenses*data[stockIndex].satuan[other_operating_expensesIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.other_operating_expenses_percent[other_operating_expensesIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<th>Operating Profit (EBIT)</th>
											<td
												v-for="(operating_profit, operating_profitIndex) in stock.operating_profit"
												:key="operating_profitIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="operating_profit*data[stockIndex].satuan[operating_profitIndex]"
															/>
															<th class="text-right">{{ stock.operating_profit_percent[operating_profitIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>Finance Income</td>
											<td
												v-for="(finance_income, finance_incomeIndex) in stock.finance_income"
												:key="finance_incomeIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="finance_income*data[stockIndex].satuan[finance_incomeIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.finance_income_percent[finance_incomeIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>Finance Costs</td>
											<td
												v-for="(finance_costs, finance_costsIndex) in stock.finance_costs"
												:key="finance_costsIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="finance_costs*data[stockIndex].satuan[finance_costsIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.finance_costs_percent[finance_costsIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<th>Profit Before Income Tax (EBT)</th>
											<td
												v-for="(profit_before_tax, profit_before_taxIndex) in stock.profit_before_tax"
												:key="profit_before_taxIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="profit_before_tax*data[stockIndex].satuan[profit_before_taxIndex]"
															/>
															<th class="text-right">{{ stock.profit_before_tax_percent[profit_before_taxIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>Income Tax</td>
											<td
												v-for="(income_tax_expense, income_tax_expenseIndex) in stock.income_tax_expense"
												:key="income_tax_expenseIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="income_tax_expense*data[stockIndex].satuan[income_tax_expenseIndex]"
															/>
															<td
																class="text-right bg-warning disabled"
															>{{ stock.income_tax_expense_percent[income_tax_expenseIndex] }}</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<th>Net Income</th>
											<td
												v-for="(comprehensive_income, comprehensive_incomeIndex) in stock.comprehensive_income"
												:key="comprehensive_incomeIndex"
												class="no-padding"
											>
												<table
													class="table table-bordered table-hover no-padding"
													style="margin-bottom: 0px !important"
												>
													<tbody>
														<tr>
															<ColMoney
																:width="'80%'"
																:money="comprehensive_income*data[stockIndex].satuan[comprehensive_incomeIndex]"
															/>
															<th
																class="text-right bg-warning disabled"
															>{{ stock.comprehensive_income_percent[comprehensive_incomeIndex] }}</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BoxHeader from "@/components/box/BoxHeader.vue";
import ColMoney from "@/components/table/ColMoney.vue";

import axios from "axios";

export default {
	components: {
		BoxHeader,
		ColMoney
	},
	data() {
		return {
			data: [],
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			errors: []
		};
	},
	created() {
		this.data = this.generateDefaultData();
	},
	methods: {
		getStockDataFromServer(stockIndex) {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/stock/code/" + this.data[stockIndex].stock_code)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);

					this.data[stockIndex].stock_data = {
						name: response.data.name,
						sector: response.data.sub_sector.sector.name,
						sub_sector: response.data.sub_sector.name
					};
				})
				.catch(err => {
					this.$store.commit("showGlobalLoader", false);
					console.error(err.response);
				});
		},
		getCommonSizing(stockIndex, periodeIndex) {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get(
					"/comprehensive-income/common-sizing/" +
						this.data[stockIndex].stock_code +
						"/periode/" +
						this.data[stockIndex].periode[periodeIndex]
				)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);

					const responseData = response.data.data;

					this.data[stockIndex].satuan[periodeIndex] =
						responseData.satuan;
					this.data[stockIndex].revenue[periodeIndex] =
						responseData.revenue;
					this.data[stockIndex].cogs[periodeIndex] =
						responseData.cogs;
					this.data[stockIndex].gross_profit[periodeIndex] =
						responseData.gross_profit;
					this.data[stockIndex].marketing_selling_expenses[
						periodeIndex
					] = responseData.marketing_selling_expenses;
					this.data[stockIndex].general_administrative_expenses[
						periodeIndex
					] = responseData.general_administrative_expenses;
					this.data[stockIndex].other_operating_expenses[
						periodeIndex
					] = responseData.other_operating_expenses;
					this.data[stockIndex].operating_profit[periodeIndex] =
						responseData.operating_profit;
					this.data[stockIndex].finance_income[periodeIndex] =
						responseData.finance_income;
					this.data[stockIndex].finance_costs[periodeIndex] =
						responseData.finance_costs;
					this.data[stockIndex].profit_before_tax[periodeIndex] =
						responseData.profit_before_tax;
					this.data[stockIndex].income_tax_expense[periodeIndex] =
						responseData.income_tax_expense;
					this.data[stockIndex].comprehensive_income[periodeIndex] =
						responseData.comprehensive_income;

					this.data[stockIndex].revenue_percent[periodeIndex] =
						responseData.revenue_percent;
					this.data[stockIndex].cogs_percent[periodeIndex] =
						responseData.cogs_percent;
					this.data[stockIndex].gross_profit_percent[periodeIndex] =
						responseData.gross_profit_percent;
					this.data[stockIndex].marketing_selling_expenses_percent[
						periodeIndex
					] = responseData.marketing_selling_expenses_percent;
					this.data[
						stockIndex
					].general_administrative_expenses_percent[periodeIndex] =
						responseData.general_administrative_expenses_percent;
					this.data[stockIndex].other_operating_expenses_percent[
						periodeIndex
					] = responseData.other_operating_expenses_percent;
					this.data[stockIndex].operating_profit_percent[
						periodeIndex
					] = responseData.operating_profit_percent;
					this.data[stockIndex].finance_income_percent[periodeIndex] =
						responseData.finance_income_percent;
					this.data[stockIndex].finance_costs_percent[periodeIndex] =
						responseData.finance_costs_percent;
					this.data[stockIndex].profit_before_tax_percent[
						periodeIndex
					] = responseData.profit_before_tax_percent;
					this.data[stockIndex].income_tax_expense_percent[
						periodeIndex
					] = responseData.income_tax_expense_percent;
					this.data[stockIndex].comprehensive_income_percent[
						periodeIndex
					] = responseData.comprehensive_income_percent;

					this.$forceUpdate();
				})
				.catch(err => {
					this.$store.commit("showGlobalLoader", false);
					console.error(err.response);
				});
		},
		generateDefaultData() {
			return [this.generateDefaultDataRow()];
		},
		generateDefaultDataRow(defaultDate = null) {
			return {
				stock_code: "",
				stock_data: {
					name: "",
					sector: "",
					sub_sector: ""
				},
				periode: [
					defaultDate
						? defaultDate
						: new Date().getFullYear().toString()
				],
				satuan: [0],
				revenue: [""],
				cogs: [""],
				gross_profit: [""],
				marketing_selling_expenses: [""],
				general_administrative_expenses: [""],
				other_operating_expenses: [""],
				operating_profit: [""],
				finance_income: [""],
				finance_costs: [""],
				profit_before_tax: [""],
				income_tax_expense: [""],
				comprehensive_income: [""],
				revenue_percent: [""],
				cogs_percent: [""],
				gross_profit_percent: [""],
				marketing_selling_expenses_percent: [""],
				general_administrative_expenses_percent: [""],
				other_operating_expenses_percent: [""],
				operating_profit_percent: [""],
				finance_income_percent: [""],
				finance_costs_percent: [""],
				profit_before_tax_percent: [""],
				income_tax_expense_percent: [""],
				comprehensive_income_percent: [""]
			};
		},
		addStockToCompare() {
			const lastIndex = this.data.length - 1;
			this.data.push(
				this.generateDefaultDataRow(this.data[lastIndex].periode[0])
			);
		},
		removeStockToCompare(stockIndex) {
			if (
				confirm(
					"Sure remove : " + this.data[stockIndex].stock_code + " ?"
				)
			) {
				this.data.splice(stockIndex, 1);
			}
		},
		validateStockCode(stockIndex) {
			this.data[stockIndex].stock_code = this.data[
				stockIndex
			].stock_code.toUpperCase();
			if (this.data[stockIndex].stock_code.length > 4) {
				this.data[stockIndex].stock_code = this.data[
					stockIndex
				].stock_code.substring(0, 4);
			}

			if (this.data[stockIndex].stock_code.length == 4) {
				this.getStockDataFromServer(stockIndex);

				this.data[stockIndex].periode.forEach(
					(periode, periodeIndex) => {
						this.getCommonSizing(stockIndex, periodeIndex);
					}
				);
			}
		},
		addPeriode(stockIndex) {
			const length = this.data[stockIndex].periode.length;
			const newPeriode = this.data[stockIndex].periode[length - 1] - 1;
			const newSatuan = this.data[stockIndex].satuan[length - 1];

			this.data[stockIndex].periode.push(newPeriode);
			this.data[stockIndex].satuan.push(newSatuan);

			this.data[stockIndex].revenue.push("");
			this.data[stockIndex].cogs.push("");
			this.data[stockIndex].gross_profit.push("");

			this.data[stockIndex].marketing_selling_expenses.push("");
			this.data[stockIndex].general_administrative_expenses.push("");
			this.data[stockIndex].other_operating_expenses.push("");

			this.data[stockIndex].operating_profit.push("");

			this.data[stockIndex].finance_income.push("");
			this.data[stockIndex].finance_costs.push("");

			this.data[stockIndex].profit_before_tax.push("");

			this.data[stockIndex].income_tax_expense.push("");

			this.data[stockIndex].comprehensive_income.push("");

			this.data[stockIndex].revenue_percent.push("");
			this.data[stockIndex].cogs_percent.push("");
			this.data[stockIndex].gross_profit_percent.push("");

			this.data[stockIndex].marketing_selling_expenses_percent.push("");
			this.data[stockIndex].general_administrative_expenses_percent.push(
				""
			);
			this.data[stockIndex].other_operating_expenses_percent.push("");

			this.data[stockIndex].operating_profit_percent.push("");

			this.data[stockIndex].finance_income_percent.push("");
			this.data[stockIndex].finance_costs_percent.push("");

			this.data[stockIndex].profit_before_tax_percent.push("");

			this.data[stockIndex].income_tax_expense_percent.push("");

			this.data[stockIndex].comprehensive_income_percent.push("");

			this.getCommonSizing(stockIndex, length);
		},
		removePeriode(stockIndex, periodeIndex) {
			if (
				confirm(
					"Sure remove data periode: " +
						this.data[stockIndex].periode[periodeIndex] +
						" ?"
				)
			) {
				this.data[stockIndex].periode.splice(periodeIndex, 1);
				this.data[stockIndex].satuan.splice(periodeIndex, 1);

				this.data[stockIndex].revenue.splice(periodeIndex, 1);
				this.data[stockIndex].cogs.splice(periodeIndex, 1);
				this.data[stockIndex].gross_profit.splice(periodeIndex, 1);

				this.data[stockIndex].marketing_selling_expenses.splice(
					periodeIndex,
					1
				);
				this.data[stockIndex].general_administrative_expenses.splice(
					periodeIndex,
					1
				);
				this.data[stockIndex].other_operating_expenses.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].operating_profit.splice(periodeIndex, 1);

				this.data[stockIndex].finance_income.splice(periodeIndex, 1);
				this.data[stockIndex].finance_costs.splice(periodeIndex, 1);

				this.data[stockIndex].profit_before_tax.splice(periodeIndex, 1);

				this.data[stockIndex].income_tax_expense.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].comprehensive_income.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].revenue_percent.splice(periodeIndex, 1);
				this.data[stockIndex].cogs_percent.splice(periodeIndex, 1);
				this.data[stockIndex].gross_profit_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].marketing_selling_expenses_percent.splice(
					periodeIndex,
					1
				);
				this.data[
					stockIndex
				].general_administrative_expenses_percent.splice(
					periodeIndex,
					1
				);
				this.data[stockIndex].other_operating_expenses_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].operating_profit_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].finance_income_percent.splice(
					periodeIndex,
					1
				);
				this.data[stockIndex].finance_costs_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].profit_before_tax_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].income_tax_expense_percent.splice(
					periodeIndex,
					1
				);

				this.data[stockIndex].comprehensive_income_percent.splice(
					periodeIndex,
					1
				);
			}
		}
	}
};
</script>

