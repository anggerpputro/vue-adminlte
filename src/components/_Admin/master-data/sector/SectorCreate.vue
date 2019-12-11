<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/master-sector"
			titleCenter="Add New Sector"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader btnBackUrl="/master-sector" titleCenter="Edit Data Sector" :showSearch="false" v-else/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							class="form-control"
							id="name"
							placeholder="Sector Name"
							v-model="sector.name"
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
	mounted() {
		const edit = this.$route.query.edit;
		const id = this.$route.query.id;
		if (edit !== undefined && id !== undefined && edit == true) {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/sector/" + id)
				.then(response => {
					this.$store.commit("showGlobalLoader", false);
					this.edit = true;
					this.editData = response.data;

					this.sector = this.editData;
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
			sector: {
				id: null,
				name: ""
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
			this.storeData(this.sector);
		},
		storeData(data) {
			if (data.name != "") {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.post("/sector", data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						this.sector.name = "";

						this.hasError = true;
						this.errorMessage = "Sector Data Saved!";
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
			this.updateData(this.sector);
		},
		updateData(data) {
			if (
				this.edit == true &&
				this.editData.id !== undefined &&
				data.name != ""
			) {
				this.hasError = false;
				this.$store.commit("showGlobalLoader", true);

				axios
					.put("/sector/" + this.editData.id, data)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);

						const updatedData = response.data;

						this.sector = {
							name: updatedData.name
						};

						this.hasError = true;
						this.errorMessage = "Sector Data Updated!";
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

