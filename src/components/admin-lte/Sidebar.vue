<template>
	<aside class="main-sidebar">
		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">
			<!-- Sidebar user panel -->
			<div class="user-panel">
				<div class="pull-left image">
					<img src="@/assets/img/user1-128x128.jpg" class="img-circle" alt="User Image" />
				</div>
				<div class="pull-left info">
					<p>Angger Priyardhan</p>
					<a href="#">
						<i class="fa fa-circle text-success"></i> Online
					</a>
				</div>
			</div>
			<!-- search form -->
			<form action="#" method="get" class="sidebar-form">
				<div class="input-group">
					<input type="text" name="q" class="form-control" placeholder="Search..." />
					<span class="input-group-btn">
						<button type="submit" name="search" id="search-btn" class="btn btn-flat">
							<i class="fa fa-search"></i>
						</button>
					</span>
				</div>
			</form>
			<!-- /.search form -->
			<!-- sidebar menu: : style can be found in sidebar.less -->
			<ul class="sidebar-menu" data-widget="tree">
				<li class="header">MAIN NAVIGATION</li>
				<router-link to="/dashboard" tag="li" exact-active-class="active">
					<a>
						<i class="fa fa-dashboard"></i>
						<span>Dashboard</span>
					</a>
				</router-link>
				<!-- KERTAS KERJA -->
				<li v-for="(menu, menu_index) in getUserMenu" :key="menu_index" class="treeview">
					<a href="#">
						<i class="fa" :class="menu.label.icon"></i>
						<span>{{ menu.label.name }}</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>

					<ul class="treeview-menu">
						<router-link
							v-for="(sub_menu, sub_menu_index) in menu.sub_menu"
							:key="menu_index+'--'+sub_menu_index"
							:to="sub_menu.label.path"
							tag="li"
							:class="$route.path.toString().startsWith(sub_menu.label.path) ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa" :class="sub_menu.label.icon"></i>
								{{ sub_menu.label.name }}
							</a>
						</router-link>
					</ul>
				</li>
			</ul>
		</section>
		<!-- /.sidebar -->
	</aside>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {};
	},
	computed: {
		getUserMenu() {
			return this.$store.getters["route/userRoutes"];
		}
	},
	created() {
		console.log("USER MENU:", this.getUserMenu);
	}
};
</script>