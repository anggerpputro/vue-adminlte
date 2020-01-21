<template>
	<div>
		<Login />
	</div>
</template>

<script>
import Login from "@/views/Login/Login.vue";

export default {
	components: {
		Login
	},
	created() {
		document.body.className = "hold-transition login-page";
	}
};
</script>
