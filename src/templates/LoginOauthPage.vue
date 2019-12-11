<template>
	<div class="login-box">
		<div class="login-logo">
			<a href="#">
				<b>Stock</b> Analyzer
			</a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg" v-if="loginAccepted">Login accepted, please wait...</p>
			<p class="login-box-msg" v-else>Please wait, redirecting...</p>
		</div>
		<!-- /.login-box-body -->
	</div>
	<!-- /.login-box -->
</template>

<script>
export default {
	data() {
		return {
			loginAccepted: false,
			query: null
		};
	},
	created() {
		const query = this.$route.query;
		this.query = query;
		if (
			query.token_type !== undefined &&
			query.expires_in !== undefined &&
			query.access_token !== undefined
		) {
			this.loginAccepted = true;
		} else {
			this.loginAccepted = false;
		}
	},
	mounted() {
		if (this.loginAccepted) {
			this.$store.dispatch("auth/callbackLogin", this.query);
		} else {
			const client_id = this.$store.getters["auth/clientId"];
			const redirect_uri = this.$store.getters["auth/redirectUri"];
			const oauth_uri = this.$store.getters["auth/oauthUri"];
			const response_type = "code";
			const scope = "";
			const params =
				"client_id=" +
				client_id +
				"&redirect_uri=" +
				redirect_uri +
				"&response_type=" +
				response_type +
				"&scope=" +
				scope;
			window.location.replace(oauth_uri + "?" + params);
		}
	}
};
</script>
