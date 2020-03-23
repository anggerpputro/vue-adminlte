<template>
	<div>
		<div class="alert" :class="loginAlert" v-if="loginError">
			{{ loginErrorMessage }}
		</div>
		<div class="form-group has-feedback">
			<input
				id="input-email"
				ref="inputEmail"
				type="email"
				class="form-control"
				placeholder="NPP"
				v-model="email"
				@keyup.enter="doLogin"
			/>
			<span class="glyphicon glyphicon-user form-control-feedback"></span>
		</div>
		<div class="form-group has-feedback">
			<input
				id="input-password"
				ref="inputPassword"
				type="password"
				class="form-control"
				placeholder="Password"
				v-model="password"
				@keyup.enter="doLogin"
			/>
			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
		</div>
		<div class="row">
			<div class="col-xs-6">
				<!-- <div class="checkbox icheck">
								<label>
									<input type="checkbox"> Remember Me
								</label>
				</div>-->
			</div>
			<!-- /.col -->
			<div class="col-xs-6">
				<button
					id="btn-login"
					type="button"
					class="btn btn-primary btn-block btn-flat"
					@click="doLogin"
				>
					{{ signInText }}
				</button>
			</div>
			<!-- /.col -->
		</div>
		<div class="row">
			<div class="col-xs-12 text-center">
				<h5 v-if="loading_data" class="text-danger">
					<strong>
						<i class="fa fa-spin fa-spinner"></i>
						&nbsp;
						<i>Signing in...</i>
					</strong>
				</h5>
				<h5 v-if="notifikasi" class="text-danger">
					<strong>{{ notifikasi }}</strong>
				</h5>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			signInText: "Sign In",
			loginError: false,
			loginErrorMessage: "",
			loginAlert: "alert-danger",
			loading_data: false,
			notifikasi: null
		};
	},
	computed: {
		loginSuccess() {
			return this.$store.getters["auth/loginSuccess"];
		}
	},
	watch: {
		loginSuccess(newValue, oldValue) {
			// console.log(newValue.status);
			// console.log(newValue.message);
			// console.log(newValue.error);

			const success = newValue.success;
			const message = newValue.message;

			document.getElementById("input-email").disabled = false;
			document.getElementById("input-password").disabled = false;
			document.getElementById("btn-login").disabled = false;
			this.loginError = !success;
			// this.email = "";
			// this.password = "";
			this.signInText = "Sign In";

			if (success != true) {
				const error = newValue.error;

				this.loginAlert = "alert-danger";
				// this.loginErrorMessage = error.data.error.message
				// 	.split("_")
				// 	.join(" ");
				this.loginErrorMessage = message;

				this.$refs.inputEmail.focus();
			} else {
				this.loginAlert = "alert-success";
				this.loginErrorMessage = message;
			}
		}
	},
	methods: {
		doLogin() {
			if (this.email != "" && this.password != "") {
				this.loginError = false;
				this.signInText = "Signing in...";
				document.getElementById("input-email").disabled = true;
				document.getElementById("input-password").disabled = true;
				document.getElementById("btn-login").disabled = true;
				this.loading_data = true;
				this.notifikasi = null;

				this.$store
					.dispatch("auth/doLogin", {
						email: this.email,
						password: this.password
					})
					.then(response => {
						this.signInText = "Redirecting...";
						this.loading_data = false;

						// window.location.replace(response);
						window.location.reload();
					})
					.catch(err => {
						this.signInText = "Sign In";
						this.loading_data = false;
						document.getElementById("input-email").disabled = false;
						document.getElementById(
							"input-password"
						).disabled = false;
						document.getElementById("btn-login").disabled = false;

						if (err.response) {
							this.notifikasi = err.response.data.message;
						} else {
							this.notifikasi = err.message;
						}
					});
			}
		}
	}
};
</script>
