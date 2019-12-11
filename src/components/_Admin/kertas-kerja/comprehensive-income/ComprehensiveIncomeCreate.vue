<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/comprehensive-income"
			titleCenter="Add New Comprehensive Income"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader
			btnBackUrl="/comprehensive-income"
			titleCenter="Edit Data Comprehensive Income"
			:showSearch="false"
			v-else
		/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-1 col-md-10">
					<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

					<table class="table table-bordered table-condensed table-striped">
						<thead>
							<tr>
								<th rowspan="2" colspan="2" class="text-center center-vertical" width="50%">ISIAN</th>
								<th colspan="2" class="text-center" width="50%">PERIODE</th>
							</tr>
							<tr>
								<th>
									<input class="form-control" type="text" v-model="comprehensiveIncome.skrg.periode">
								</th>
								<th>
									<input
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.periode"
										:disabled="edit"
									>
								</th>
							</tr>
						</thead>

						<tbody>
							<table-input label="Kode Saham">
								<td colspan="2">
									<input
										class="form-control"
										type="text"
										v-model="getKodeSaham"
										@keyup="validateKodeSaham"
										:readonly="edit"
									>
								</td>
							</table-input>
							<tr>
								<th colspan="4" class="text-primary">
									<small>
										<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
									</small>
									PENDAPATAN:
								</th>
							</tr>
							<table-input label="&nbsp;** Revenue">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.revenue"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.revenue"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** COGS (Cost of Goods Sold)">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.cogs"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.cogs"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<tr>
								<th colspan="4" class="text-primary">
									<small>
										<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
									</small>
									BEBAN:
								</th>
							</tr>
							<table-input label="&nbsp;** Marketing and Selling Expenses">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.marketing_selling_expenses"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.marketing_selling_expenses"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** General and Administration Expenses">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.general_administration_expenses"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.general_administration_expenses"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Other Expenses">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.other_expenses"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.other_expenses"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<tr>
								<th colspan="4" class="text-primary">
									<small>
										<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
									</small>
									LAIN-LAIN:
								</th>
							</tr>
							<table-input label="&nbsp;** Finance Income">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.finance_income"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.finance_income"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Finance Costs">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.finance_costs"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.finance_costs"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<tr>
								<th colspan="4" class="text-primary">
									<small>
										<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
									</small>
									PAJAK:
								</th>
							</tr>
							<table-input label="&nbsp;** Income Tax">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.income_tax"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.income_tax"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<tr>
								<th colspan="4" class="text-primary">
									<small>
										<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
									</small>
									BERSIH:
								</th>
							</tr>
							<table-input label="&nbsp;** Net Income">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.skrg.net_income"
										:placeholder="comprehensiveIncome.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="comprehensiveIncome.lalu.net_income"
										:placeholder="comprehensiveIncome.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<tr v-if=" ! edit">
								<td colspan="2" class="text-center">
									<button class="btn btn-primary">
										<strong>
											<i class="fa fa-check-circle-o"></i> Submit
										</strong>
									</button>
								</td>
								<td colspan="2" class="text-center">
									<button class="btn btn-success" @click="submit">
										<strong>
											<i class="fa fa-check-circle"></i> Submit & Add More
										</strong>
									</button>
								</td>
							</tr>
							<tr v-else>
								<td colspan="4" class="text-center">
									<button class="btn btn-success" @click="submitUpdate">
										<strong>
											<i class="fa fa-check-circle"></i> Save Data
										</strong>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
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
	mounted() {
		const edit = this.$route.query.edit;
		const id = this.$route.query.id;
		if (edit !== undefined && id !== undefined && edit == true) {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/comprehensive-income/" + id)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);
					this.edit = true;
					this.editData = response.data;

					this.kode_saham = this.editData.stock_code;
					this.comprehensiveIncome.skrg = this.editData;
				})
				.catch(e => {
					this.$store.commit("showGlobalLoader", false);
					this.hasError = true;
					this.errorMessage = e.response.data.message;
					this.alertClass = "alert-danger";
					console.error(e);
				});
		}
	},
	data() {
		return {
			kode_saham: "",
			comprehensiveIncome: {
				lalu: {
					periode: new Date().getFullYear() - 1,
					revenue: "",
					cogs: "",
					marketing_selling_expenses: "",
					general_administration_expenses: "",
					other_expenses: "",
					finance_income: "",
					finance_costs: "",
					income_tax: "",
					net_income: ""
				},
				skrg: {
					periode: new Date().getFullYear(),
					revenue: "",
					cogs: "",
					marketing_selling_expenses: "",
					general_administration_expenses: "",
					other_expenses: "",
					finance_income: "",
					finance_costs: "",
					income_tax: "",
					net_income: ""
				}
			},
			money: {
				decimal: ",",
				thousands: ".",
				prefix: "Rp ",
				precision: 0,
				masked: false /* doesn't work with directive */
			},
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			edit: false,
			editData: null
		};
	},
	computed: {
		getKodeSaham: {
			get() {
				if (
					this.edit == true &&
					this.editData.stock_code !== undefined
				) {
					return this.editData.stock_code;
				} else {
					return this.kode_saham;
				}
			},
			set(newValue) {
				this.kode_saham = newValue;
			}
		}
	},
	methods: {
		validateKodeSaham() {
			this.kode_saham = this.kode_saham.toUpperCase();
			if (this.kode_saham.length > 4) {
				this.kode_saham = this.kode_saham.substring(0, 4);
			}
		},
		submit() {
			const data_skr = this.comprehensiveIncome.skrg;
			data_skr.stock_code = this.kode_saham;
			this.storeData(data_skr);

			const data_lalu = this.comprehensiveIncome.lalu;
			data_lalu.stock_code = this.kode_saham;
			this.storeData(data_lalu);
		},
		storeData(data) {
			if (
				data.periode != "" &&
				data.stock_code != "" &&
				data.revenue > 0 &&
				data.cogs > 0 &&
				data.net_income > 0
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post("/comprehensive-income", data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);
						if (
							data.periode ==
							this.comprehensiveIncome.skrg.periode
						) {
							this.comprehensiveIncome.skrg = {
								periode: data.periode,
								revenue: "",
								cogs: "",
								marketing_selling_expenses: "",
								general_administration_expenses: "",
								other_expenses: "",
								finance_income: "",
								finance_costs: "",
								income_tax: "",
								net_income: ""
							};
						} else {
							this.comprehensiveIncome.lalu = {
								periode: data.periode,
								revenue: "",
								cogs: "",
								marketing_selling_expenses: "",
								general_administration_expenses: "",
								other_expenses: "",
								finance_income: "",
								finance_costs: "",
								income_tax: "",
								net_income: ""
							};
						}
						this.hasError = true;
						this.errorMessage = "Comprehensive Income Data Saved!";
						this.alertClass = "alert-success";
					})
					.catch(e => {
						this.$store.commit("showGlobalLoader", false);

						this.hasError = true;
						this.errorMessage = e.response.data.message;
						this.alertClass = "alert-danger";

						console.error(e);
					});
			}
		},
		submitUpdate() {
			const data_skr = this.comprehensiveIncome.skrg;
			data_skr.stock_code = this.kode_saham;
			this.updateData(data_skr);
		},
		updateData(data) {
			if (
				this.edit == true &&
				this.editData.id !== undefined &&
				data.periode != "" &&
				data.stock_code != "" &&
				data.revenue > 0 &&
				data.cogs > 0 &&
				data.net_income > 0
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.put("/comprehensive-income/" + this.editData.id, data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						const updatedData = response.data;

						this.comprehensiveIncome.skrg = {
							periode: updatedData.periode,
							revenue: updatedData.revenue,
							cogs: updatedData.cogs,
							marketing_selling_expenses:
								updatedData.marketing_selling_expenses,
							general_administration_expenses:
								updatedData.general_administration_expenses,
							other_expenses: updatedData.other_expenses,
							finance_income: updatedData.finance_income,
							finance_costs: updatedData.finance_costs,
							income_tax: updatedData.income_tax,
							net_income: updatedData.net_income
						};
						this.hasError = true;
						this.errorMessage =
							"Comprehensive Income Data Updated!";
						this.alertClass = "alert-success";
					})
					.catch(e => {
						this.$store.commit("showGlobalLoader", false);

						this.hasError = true;
						this.errorMessage = e.response.data.message;
						this.alertClass = "alert-danger";

						console.error(e);
					});
			}
		}
	}
};
</script>

