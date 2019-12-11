<template>
	<nav class="navbar navbar-default navbar-static-top">
		<div class="container">
			<div class="navbar-header">
				<router-link to="/" class="navbar-brand">Stock Analyzer</router-link>
			</div>

			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<router-link to="/" tag="li" exact-active-class="active">
						<a class="nav-link">Home</a>
					</router-link>
					<!-- <router-link to="/portofolio" tag="li" exact-active-class="active">
						<a class="nav-link">Portofolio</a>
					</router-link>
					<router-link to="/stocks" tag="li" exact-active-class="active">
						<a class="nav-link">Stocks</a>
					</router-link>-->
					<li
						class="dropdown"
						:class="{open: dropdownMasterDataOpen}"
						@click="dropdownMasterDataOpen = !dropdownMasterDataOpen"
					>
						<a
							href="#"
							class="dropdown-toggle"
							data-toggle="dropdown"
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Master Data
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li>
								<a href="#">Sector</a>
							</li>
							<li>
								<a href="#">Sub-Sector</a>
							</li>
							<router-link to="/master-data/stock" tag="li" exact-active-class="active">
								<a>Stock</a>
							</router-link>
						</ul>
					</li>
					<li
						class="dropdown"
						:class="{open: dropdownLaporanKeuanganOpen}"
						@click="dropdownLaporanKeuanganOpen = !dropdownLaporanKeuanganOpen"
					>
						<a
							href="#"
							class="dropdown-toggle"
							data-toggle="dropdown"
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Laporan Keuangan
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<router-link to="/laporan-keuangan/kertas-kerja" tag="li" exact-active-class="active">
								<a>Kertas Kerja</a>
							</router-link>
						</ul>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right">
					<router-link v-if="!isAuthenticated" to="/login" tag="li" exact-active-class="active">
						<a class="nav-link">Login</a>
					</router-link>
					<li v-else>
						<strong class="navbar-text">{{ userEmail }}</strong>
					</li>
					<router-link to="/about" tag="li" exact-active-class="active">
						<a class="nav-link">About</a>
					</router-link>
					<li v-if="isAuthenticated">
						<a class="nav-link" href="#" @click="doLogout">Logout</a>
					</li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>
</template>

<script>
export default {
	data() {
		return {
			dropdownMasterDataOpen: false,
			dropdownLaporanKeuanganOpen: false
		};
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters["auth/isAuthenticated"];
		},
		userEmail() {
			return this.$store.getters["auth/user"].email;
		}
	},
	methods: {
		doLogout() {
			if (confirm("Logout?")) {
				this.$store.dispatch("auth/doLogout");
			}
		}
	}
};
</script>
