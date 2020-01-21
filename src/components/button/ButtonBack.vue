<template>
	<button :class="buttonClass" @click="btnBackClicked">
		<strong>
			<i class="fa fa-long-arrow-left"></i>
			&nbsp;Back
		</strong>
	</button>
</template>

<script>
export default {
	props: ["buttonClass"],
	methods: {
		btnBackClicked() {
			this.$router.go(-1);
		}
	}
};
</script>