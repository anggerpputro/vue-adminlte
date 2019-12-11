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
				<li class="treeview">
					<a href="#">
						<i class="fa fa-edit"></i>
						<span>Kertas Kerja</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link
							to="/comprehensive-income"
							tag="li"
							:class="$route.path.toString().startsWith('/comprehensive-income') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Comprehensive Income
							</a>
						</router-link>
						<router-link
							to="/balance-sheet"
							tag="li"
							:class="$route.path.toString().startsWith('/balance-sheet') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Balance Sheet
							</a>
						</router-link>
						<router-link
							to="/cash-flow"
							tag="li"
							:class="$route.path.toString().startsWith('/cash-flow') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Cash Flow
							</a>
						</router-link>
						<router-link
							to="/general-fundamental"
							tag="li"
							:class="$route.path.toString().startsWith('/general-fundamental') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> General Fundamental
							</a>
						</router-link>
					</ul>
				</li>
				<!-- COMMON SIZING -->
				<li class="treeview">
					<a href="#">
						<i class="fa fa-pie-chart"></i>
						<span>Common Sizing</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link
							to="/common-sizing-comprehensive-income"
							tag="li"
							:class="$route.path.toString().startsWith('/common-sizing-comprehensive-income') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Comprehensive Income
							</a>
						</router-link>
						<router-link
							to="/common-sizing-balance-sheet"
							tag="li"
							:class="$route.path.toString().startsWith('/common-sizing-balance-sheet') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Balance Sheet
							</a>
						</router-link>
						<router-link
							to="/common-sizing-cash-flow"
							tag="li"
							:class="$route.path.toString().startsWith('/common-sizing-cash-flow') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Cash Flow
							</a>
						</router-link>
					</ul>
				</li>
				<!-- MARKET INDEX -->
				<li class="treeview">
					<a href="#">
						<i class="fa fa-tag"></i>
						<span>Market Index</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link
							to="/market-index"
							tag="li"
							:class="$route.path.toString().startsWith('/market-index') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Daftar Market Index
							</a>
						</router-link>
						<router-link
							to="/stock-score"
							tag="li"
							:class="$route.path.toString().startsWith('/stock-score') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Stock Score
							</a>
						</router-link>
					</ul>
				</li>
				<!-- MASTER DATA -->
				<li class="treeview">
					<a href="#">
						<i class="fa fa-database"></i>
						<span>Master Data</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link
							to="/master-sector"
							tag="li"
							:class="$route.path.toString().startsWith('/master-sector') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Sector
							</a>
						</router-link>
						<router-link
							to="/master-sub-sector"
							tag="li"
							:class="$route.path.toString().startsWith('/master-sub-sector') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Sub Sector
							</a>
						</router-link>
						<router-link
							to="/master-stock"
							tag="li"
							:class="$route.path.toString().startsWith('/master-stock') ? 'active router-link-active' : ''"
						>
							<a>
								<i class="fa fa-circle-o"></i> Stock
							</a>
						</router-link>
					</ul>
				</li>
			</ul>
		</section>
		<!-- /.sidebar -->
	</aside>
</template>
