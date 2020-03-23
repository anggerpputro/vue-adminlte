<template>
	<div class="login-box">
		<div class="login-logo">
			<a href="#"> <b>Vue</b> AdminLTE </a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">Sign in to start your session</p>

			<LoginForm />

			<!-- <div class="social-auth-links text-center">
					<p>- OR -</p>
					<a href="#" class="btn btn-block btn-social btn-facebook btn-flat">
						<i class="fa fa-facebook"></i> Sign in using
						Facebook
					</a>
					<a href="#" class="btn btn-block btn-social btn-google btn-flat">
						<i class="fa fa-google-plus"></i> Sign in using
						Google+
					</a>
			</div>-->
			<!-- /.social-auth-links -->
			<!-- <a href="#">I forgot my password</a>
				<br>
			<a href="register.html" class="text-center">Register a new membership</a>-->
		</div>
		<!-- /.login-box-body -->
	</div>
	<!-- /.login-box -->
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
	components: {
		LoginForm
	}
};
</script>
