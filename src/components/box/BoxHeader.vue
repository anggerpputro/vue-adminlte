<template>
	<div class="box-header with-border text-center">
		<h3 v-if="titleCenter != null" class="box-title text-center">
			<u>{{ titleCenter }}</u>
		</h3>
		<button v-if="btnAddUrl != null" class="btn btn-primary btn-sm pull-left" @click="btnAddClicked">
			<strong>
				<i class="fa fa-plus-circle"></i> Add New
			</strong>
		</button>
		<button
			v-if="btnBackUrl != null"
			class="btn btn-default btn-sm pull-left"
			@click="btnBackClicked"
		>
			<strong>
				<i class="fa fa-long-arrow-left"></i> Back
			</strong>
		</button>

		<slot></slot>

		<div class="box-tools pull-right">
			<div v-if="showSearch" class="form-inline">
				<div class="form-group">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Search...">
						<div class="input-group-addon">
							<i class="fa fa-search"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		titleCenter: {
			type: String,
			default: null
		},
		btnAddUrl: {
			type: String,
			default: null
		},
		btnBackUrl: {
			type: String,
			default: null
		},
		showSearch: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		btnAddClicked() {
			this.$router.replace(this.btnAddUrl);
		},
		btnBackClicked() {
			this.$router.replace(this.btnBackUrl);
		}
	}
};
</script>
