<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/master-stock"
			titleCenter="Add New Stock"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader btnBackUrl="/master-stock" titleCenter="Edit Data Stock" :showSearch="false" v-else/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

					<div class="form-group">
						<label for="sub_sector_id">Sub-Sector</label>
						<select
							name="sector_id"
							class="form-control"
							id="sub_sector_id"
							v-model="stock.sub_sector_id"
							:disabled="sectors == null || sectors.length <= 0"
						>
							<option value>..:: Pilih Sub-Sector ::..</option>
							<optgroup v-for="(sector, sector_index) in sectors" :key="sector_index" :label="sector.name">
								<option
									v-for="(sub_sector, sub_sector_index) in sector.sub_sectors"
									:key="sub_sector_index"
									:value="sub_sector.id"
								>{{ sub_sector.name }}</option>
							</optgroup>
						</select>
					</div>

					<div class="form-group">
						<label for="stock_code">Stock Code</label>
						<input
							type="text"
							class="form-control"
							id="stock_code"
							placeholder="Stock Code"
							v-model="stock.stock_code"
							@keyup="validateStockCode"
						>
					</div>

					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							class="form-control"
							id="name"
							placeholder="Stock Name"
							v-model="stock.name"
						>
					</div>

					<div class="form-group">
						<label for="sharia">Is Sharia?</label>
						<div class="radio">
							<label>
								<input type="radio" name="sharia" :value="true" v-model="stock.sharia">
								Yes
							</label>
						</div>
						<div class="radio">
							<label>
								<input type="radio" name="sharia" :value="false" v-model="stock.sharia">
								No
							</label>
						</div>
					</div>

					<div class="text-center">
						<button v-if=" ! edit" class="btn btn-success" @click="submit">
							<strong>
								<i class="fa fa-check-circle"></i> Submit & Add More
							</strong>
						</button>
						<button v-else class="btn btn-success" @click="submitUpdate">
							<strong>
								<i class="fa fa-check-circle"></i> Save Data
							</strong>
						</button>
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
	created() {
		this.$store.commit("showGlobalLoader", true);
		axios
			.get("/sector/with-sub-sectors")
			.then(response => {
				this.$store.commit("showGlobalLoader", false);
				this.sectors = response.data.data;
			})
			.catch(e => {
				this.$store.commit("showGlobalLoader", false);
				this.hasError = true;
				this.errorMessage = e.response.data.message;
				this.alertClass = "alert-danger";
				console.error(e);
			});
	},
	mounted() {
		const edit = this.$route.query.edit;
		const id = this.$route.query.id;
		if (edit !== undefined && id !== undefined && edit == true) {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/stock/" + id)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);
					this.edit = true;
					this.editData = response.data;

					this.stock = this.editData;
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
			sectors: null,
			stock: {
				id: null,
				stock_code: "",
				name: "",
				sharia: true,
				sub_sector_id: ""
			},
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			edit: false,
			editData: null
		};
	},
	methods: {
		validateStockCode() {
			this.stock.stock_code = this.stock.stock_code.toUpperCase();
			if (this.stock.stock_code.length > 4) {
				this.stock.stock_code = this.stock.stock_code.substring(0, 4);
			}
		},
		submit() {
			this.storeData(this.stock);
		},
		storeData(data) {
			if (
				data.sub_sector_id != "" &&
				data.stock_code != "" &&
				data.name != ""
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post("/stock", data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						this.stock.stock_code = "";
						this.stock.name = "";
						this.stock.sharia = true;
						this.stock.sub_sector_id = "";

						this.hasError = true;
						this.errorMessage = "Stock Data Saved!";
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
			this.updateData(this.stock);
		},
		updateData(data) {
			if (
				this.edit == true &&
				this.editData.id !== undefined &&
				data.sub_sector_id != "" &&
				data.stock_code != "" &&
				data.name != ""
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.put("/stock/" + this.editData.id, data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						const updatedData = response.data;

						this.stock = {
							stock_code: updatedData.stock_code,
							name: updatedData.name,
							sharia: updatedData.sharia,
							sub_sector_id: updatedData.sub_sector_id
						};

						this.hasError = true;
						this.errorMessage = "Stock Data Updated!";
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

