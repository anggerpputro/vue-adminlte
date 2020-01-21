<template>
	<div class="box-footer with-border text-center">
		<button
			v-if="btnRightUrl != null"
			class="btn btn-default btn-sm pull-right"
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
		<button
			v-if="btnLeftUrl != null"
			class="btn btn-default btn-sm pull-left"
			@click="btnLeftClicked"
		>
			<strong>
				<i class="fa" :class="
						btnLeftIcon != null ? btnLeftIcon : 'fa-long-arrow-left'
					"></i>
				{{ btnLeftLabel != null ? btnLeftLabel : "Back" }}
			</strong>
		</button>

		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		titleCenter: {
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
		btnLeftUrl: {
			type: String,
			default: null
		},
		btnLeftIcon: {
			type: String,
			default: null
		},
		btnLeftLabel: {
			type: String,
			default: null
		}
	},
	methods: {
		btnRightClicked() {
			this.$router.push({ path: this.btnRightUrl });
		},
		btnLeftClicked() {
			if (this.btnLeftUrl == "") {
				this.$router.go(-1);
			} else {
				this.$router.push({ path: this.btnLeftUrl });
			}
		}
	}
};
</script>
