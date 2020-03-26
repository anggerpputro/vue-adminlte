<template>
	<div class="box-header with-border text-center">
		<h3 v-if="titleCenter != null" class="box-title text-center">{{ titleCenter }}</h3>
		<button v-if="btnAddUrl != null" class="btn btn-primary btn-sm pull-left" @click="btnAddClicked">
			<strong>
				<i class="fa" :class="btnAddIcon != null ? btnAddIcon : 'fa-plus-circle'"></i>
				{{ btnAddLabel != null ? btnAddLabel : "Add New" }}
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

		<button
			v-if="btnRightUrl != null"
			class="btn btn-primary btn-sm pull-right"
			@click="btnRightClicked"
		>
			<strong>
				<i
					class="fa"
					:class="
						btnRightIcon != null
							? btnRightIcon
							: 'fa-long-arrow-right'
					"
				></i>
				{{ btnRightLabel != null ? btnRightLabel : "Next" }}
			</strong>
		</button>

		<div class="box-tools pull-right">
			<div v-if="showSearch" class="form-inline">
				<div class="form-group">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="searchText"
							@keyup.enter="searchSubmitted"
							placeholder="Search..."
						/>
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
		btnAddIcon: {
			type: String,
			default: null
		},
		btnAddLabel: {
			type: String,
			default: null
		},
		btnRightUrl: {
			type: String,
			default: null
		},
		btnRightIcon: {
			type: String,
			default: null
		},
		btnRightLabel: {
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
		},
		searchText: {
			type: String,
			default: ""
		}
	},
	methods: {
		btnAddClicked() {
			this.$router.push({ path: this.btnAddUrl });
		},
		btnRightClicked() {
			this.$router.push({ path: this.btnRightUrl });
		},
		btnBackClicked() {
			if (this.btnBackUrl == "") {
				this.$router.go(-1);
			} else {
				this.$router.push({ path: this.btnBackUrl });
			}
		},
		searchSubmitted() {
			this.$emit("searchSubmitted", this.searchText);
		}
	}
};
</script>
