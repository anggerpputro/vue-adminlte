<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/balance-sheet"
			titleCenter="Add New Balance Sheet"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader
			btnBackUrl="/balance-sheet"
			titleCenter="Edit Data Balance Sheet"
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
									<input class="form-control" type="text" v-model="balanceSheet.skrg.periode">
								</th>
								<th>
									<input
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.periode"
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
									ASET:
								</th>
							</tr>
							<table-input label="&nbsp;** Kas">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.kas"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.kas"
										:placeholder="balanceSheet.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Piutang Usaha">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.piutang_usaha"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.piutang_usaha"
										:placeholder="balanceSheet.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Persediaan">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.persediaan"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.persediaan"
										:placeholder="balanceSheet.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Total Aset Lancar">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.total_aset_lancar"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.total_aset_lancar"
										:placeholder="balanceSheet.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Total Aset Tidak Lancar">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.total_aset_tidak_lancar"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.total_aset_tidak_lancar"
										:placeholder="balanceSheet.lalu.periode"
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
									LIABILITAS:
								</th>
							</tr>
							<table-input label="&nbsp;** Total Liabilitas Jangka Pendek">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.total_liabilitas_jangka_pendek"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.total_liabilitas_jangka_pendek"
										:placeholder="balanceSheet.lalu.periode"
										v-bind="money"
										:disabled="edit"
									/>
								</td>
							</table-input>
							<table-input label="&nbsp;** Total Liabilitas Jangka Panjang">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.total_liabilitas_jangka_panjang"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.total_liabilitas_jangka_panjang"
										:placeholder="balanceSheet.lalu.periode"
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
									EKUITAS:
								</th>
							</tr>
							<table-input label="&nbsp;** Total Ekuitas">
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.skrg.total_ekuitas"
										:placeholder="balanceSheet.skrg.periode"
										v-bind="money"
									/>
								</td>
								<td>
									<money
										class="form-control"
										type="text"
										v-model="balanceSheet.lalu.total_ekuitas"
										:placeholder="balanceSheet.lalu.periode"
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
				.get("/balance-sheet/" + id)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);
					this.edit = true;
					this.editData = response.data;

					this.kode_saham = this.editData.stock_code;
					this.balanceSheet.skrg = this.editData;
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
			balanceSheet: {
				lalu: {
					periode: new Date().getFullYear() - 1,
					kas: "",
					piutang_usaha: "",
					persediaan: "",
					total_aset_lancar: "",
					total_aset_tidak_lancar: "",
					total_liabilitas_jangka_pendek: "",
					total_liabilitas_jangka_panjang: "",
					total_ekuitas: ""
				},
				skrg: {
					periode: new Date().getFullYear(),
					kas: "",
					piutang_usaha: "",
					persediaan: "",
					total_aset_lancar: "",
					total_aset_tidak_lancar: "",
					total_liabilitas_jangka_pendek: "",
					total_liabilitas_jangka_panjang: "",
					total_ekuitas: ""
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
			const data_skr = this.balanceSheet.skrg;
			data_skr.stock_code = this.kode_saham;
			this.storeData(data_skr);

			const data_lalu = this.balanceSheet.lalu;
			data_lalu.stock_code = this.kode_saham;
			this.storeData(data_lalu);
		},
		storeData(data) {
			if (data.periode != "" && data.stock_code != "" && data.kas > 0) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post("/balance-sheet", data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);
						if (data.periode == this.balanceSheet.skrg.periode) {
							this.balanceSheet.skrg = {
								periode: data.periode,
								kas: "",
								piutang_usaha: "",
								persediaan: "",
								total_aset_lancar: "",
								total_aset_tidak_lancar: "",
								total_liabilitas_jangka_pendek: "",
								total_liabilitas_jangka_panjang: "",
								total_ekuitas: ""
							};
						} else {
							this.balanceSheet.lalu = {
								periode: data.periode,
								kas: "",
								piutang_usaha: "",
								persediaan: "",
								total_aset_lancar: "",
								total_aset_tidak_lancar: "",
								total_liabilitas_jangka_pendek: "",
								total_liabilitas_jangka_panjang: "",
								total_ekuitas: ""
							};
						}
						this.hasError = true;
						this.errorMessage = "Balance Sheet Data Saved!";
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
			const data_skr = this.balanceSheet.skrg;
			data_skr.stock_code = this.kode_saham;
			this.updateData(data_skr);
		},
		updateData(data) {
			if (
				this.edit == true &&
				this.editData.id !== undefined &&
				data.periode != "" &&
				data.stock_code != "" &&
				data.kas > 0
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.put("/balance-sheet/" + this.editData.id, data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						const updatedData = response.data;

						this.balanceSheet.skrg = {
							periode: updatedData.periode,
							kas: updatedData.kas,
							piutang_usaha: updatedData.piutang_usaha,
							persediaan: updatedData.persediaan,
							total_aset_lancar: updatedData.total_aset_lancar,
							total_aset_tidak_lancar:
								updatedData.total_aset_tidak_lancar,
							total_liabilitas_jangka_pendek:
								updatedData.total_liabilitas_jangka_pendek,
							total_liabilitas_jangka_panjang:
								updatedData.total_liabilitas_jangka_panjang,
							total_ekuitas: updatedData.total_ekuitas
						};
						this.hasError = true;
						this.errorMessage = "Balance Sheet Data Updated!";
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

