<template>
	<header class="main-header">
		<!-- Logo -->
		<router-link to="/dashboard" class="logo">
			<!-- mini logo for sidebar mini 50x50 pixels -->
			<span class="logo-mini">
				<b>PPTKA</b>
			</span>
			<!-- logo for regular state and mobile devices -->
			<span class="logo-lg">
				<b>PPTKA</b>
			</span>
		</router-link>

		<!-- Header Navbar: style can be found in header.less -->
		<nav class="navbar navbar-static-top">
			<!-- Sidebar toggle button-->
			<a
				href="#"
				class="sidebar-toggle"
				data-toggle="push-menu"
				role="button"
			>
				<span class="sr-only">Toggle navigation</span>
			</a>
			<!-- Navbar Right Menu -->
			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<!-- Messages: style can be found in dropdown.less-->
					<!-- <li class="dropdown messages-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-envelope-o"></i>
							<span class="label label-success"></span>
						</a>
						<ul class="dropdown-menu">
							<li class="header">You have 0 messages</li>
							<li>
								<ul class="menu"></ul>
							</li>
							<li class="footer">
								<a href="#">See All Messages</a>
							</li>
						</ul>
					</li>-->
					<!-- Notifications: style can be found in dropdown.less -->
					<li class="dropdown notifications-menu">
						<a
							href="#"
							class="dropdown-toggle"
							data-toggle="dropdown"
						>
							<i class="fa fa-bell-o"></i>
							<span class="label label-warning"></span>
						</a>
						<ul class="dropdown-menu">
							<li class="header">You have 0 notifications</li>
							<li>
								<ul class="menu"></ul>
							</li>
							<li class="footer">
								<a href="#">View all</a>
							</li>
						</ul>
					</li>
					<!-- Tasks: style can be found in dropdown.less -->
					<!-- <li class="dropdown tasks-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-flag-o"></i>
							<span class="label label-danger"></span>
						</a>
						<ul class="dropdown-menu">
							<li class="header">You have 0 tasks</li>
							<li>
								<ul class="menu"></ul>
							</li>
							<li class="footer">
								<a href="#">View all tasks</a>
							</li>
						</ul>
					</li>-->
					<!-- User Account: style can be found in dropdown.less -->
					<li class="dropdown user user-menu">
						<a
							href="#"
							class="dropdown-toggle"
							data-toggle="dropdown"
						>
							<img
								src="@/assets/img/user1-128x128.jpg"
								class="user-image"
								alt="User Image"
								style="margin-top:-2px; margin-right: 10px;"
							/>
							<span :class="hidden_xs ? 'hidden-xs' : ''">
								{{ getUserData.name }}
							</span>
						</a>
						<ul class="dropdown-menu">
							<!-- User image -->
							<li class="user-header">
								<img
									src="@/assets/img/user1-128x128.jpg"
									class="img-circle"
									alt="User Image"
								/>

								<p>
									{{ getUserData.name }} - Petugas Survey
									<small
										>NPP: {{ getUserData.npp }} - Cabang:
										{{
											getUserData.mcabang
												? getUserData.mcabang.nama_cab
												: ""
										}}</small
									>
								</p>
							</li>
							<!-- Menu Body -->
							<!-- <li class="user-body">
								<div class="row">
									<div class="col-xs-4 text-center">
										<a href="#">Followers</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="#">Sales</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="#">Friends</a>
									</div>
								</div>
							</li>-->
							<!-- Menu Footer-->
							<li class="user-footer">
								<div class="pull-left">
									<a
										href="#"
										class="btn btn-default btn-flat"
										@click.prevent="gotoProfile"
										>Profile</a
									>
								</div>
								<div class="pull-right">
									<a
										href="#"
										class="btn btn-danger btn-flat"
										@click.prevent="doLogout"
										style="background: transparent; color: #d73925"
										>Sign out</a
									>
								</div>
							</li>
						</ul>
					</li>
					<!-- Control Sidebar Toggle Button -->
					<li>
						<a href="#" data-toggle="control-sidebar">
							<i class="fa fa-gears"></i>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			hidden_xs: false
		};
	},
	computed: {
		getUserData() {
			return this.$store.getters["auth/user"];
		}
	},
	methods: {
		gotoProfile() {
			this.$router.push({
				path: "/settings/profile"
			});
		},
		doLogout() {
			if (confirm("Sign out?")) {
				this.$store.dispatch("auth/doLogout");
			}
		}
	}
};
</script>
