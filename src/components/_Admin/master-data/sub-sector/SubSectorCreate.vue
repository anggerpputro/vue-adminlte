<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/master-sub-sector"
			titleCenter="Add New Sub-Sector"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader
			btnBackUrl="/master-sub-sector"
			titleCenter="Edit Data Sub-Sector"
			:showSearch="false"
			v-else
		/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

					<div class="form-group">
						<label for="sector_id">Sector</label>
						<select
							name="sector_id"
							class="form-control"
							id="sector_id"
							v-model="subSector.sector_id"
							:disabled="sectors == null || sectors.length <= 0"
						>
							<option value>..:: Pilih Sector ::..</option>
							<option v-for="(sector, index) in sectors" :key="index" :value="sector.id">{{ sector.name }}</option>
						</select>
					</div>

					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							class="form-control"
							id="name"
							placeholder="Sub Sector Name"
							v-model="subSector.name"
						>
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
			.get("/sector")
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
				.get("/sub-sector/" + id)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);
					this.edit = true;
					this.editData = response.data;

					this.subSector = this.editData;
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
			subSector: {
				id: null,
				name: "",
				sector_id: ""
			},
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			edit: false,
			editData: null
		};
	},
	methods: {
		submit() {
			this.storeData(this.subSector);
		},
		storeData(data) {
			if (data.sector_id != "" && data.name != "") {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post("/sub-sector", data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						this.subSector.name = "";
						this.subSector.sector_id = "";

						this.hasError = true;
						this.errorMessage = "Sub-Sector Data Saved!";
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
			this.updateData(this.subSector);
		},
		updateData(data) {
			if (
				this.edit == true &&
				this.editData.id !== undefined &&
				data.sector_id != "" &&
				data.name != ""
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.put("/sub-sector/" + this.editData.id, data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						const updatedData = response.data;

						this.subSector = {
							name: updatedData.name,
							sector_id: updatedData.sector_id
						};

						this.hasError = true;
						this.errorMessage = "Sub-Sector Data Updated!";
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

