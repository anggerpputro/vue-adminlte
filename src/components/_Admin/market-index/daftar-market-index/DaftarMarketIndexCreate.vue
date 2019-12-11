<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/market-index"
			titleCenter="Add New Market Index"
			:showSearch="false"
			v-if=" ! edit"
		/>
		<BoxHeader
			btnBackUrl="/market-index"
			titleCenter="Edit Data Market Index"
			:showSearch="false"
			v-else
		/>

		<div class="box-body">
			<div class="row">
				<div class="col-md-offset-3 col-md-6">
					<div class="alert" :class="alertClass" v-if="hasError">{{ errorMessage }}</div>

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
	created() {},
	mounted() {},
	data() {
		return {
			hasError: false,
			errorMessage: "",
			alertClass: "alert-danger",
			edit: false,
			editData: null
		};
	},
	methods: {}
};
</script>

