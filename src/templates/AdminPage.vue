<template>
	<div class="wrapper">
		<Header />
		<Sidebar />

		<!-- <Content/> -->
		<div class="content-wrapper">
			<router-view name="contentNoAnimation"></router-view>
			<transition name="slide" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>

		<Footer />
		<ControlSidebar />

		<!-- <div class="container">
			<transition name="slide" mode="out-in">
				<router-view/>
			</transition>
		</div>-->
	</div>
</template>

<script>
import Header from "@/components/admin-lte/Header.vue";
import Sidebar from "@/components/admin-lte/Sidebar.vue";
// import Content from "@/components/admin-lte/Content.vue";
import Footer from "@/components/admin-lte/Footer.vue";
import ControlSidebar from "@/components/admin-lte/ControlSidebar.vue";

import axios from "axios";

export default {
	components: {
		Header,
		Sidebar,
		// Content,
		Footer,
		ControlSidebar
	},
	created() {
		this.$store.dispatch("auth/cekLogin");

		const tokenType = this.$store.getters["auth/tokenType"];
		const token = this.$store.getters["auth/token"];
		axios.defaults.headers.common["Accept"] = "application/json";
		axios.defaults.headers.common["Authorization"] =
			tokenType + " " + token;

		document.body.className = "hold-transition skin-blue sidebar-mini";

		const path = this.$route.path;
		if (path == "/") {
			this.$router.replace("/dashboard");
		}
	}
};
</script>
