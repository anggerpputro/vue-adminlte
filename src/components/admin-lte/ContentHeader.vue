<template>
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			{{ title }}
			<small>{{ sub_title }}</small>
		</h1>
		<ol class="breadcrumb">
			<router-link to="/dashboard" tag="li" exact-active-class="active">
				<a>
					<i class="fa fa-dashboard"></i> Home
				</a>
			</router-link>
			<li class="active">{{ title }}</li>
		</ol>
	</section>
</template>

<script>
export default {
	props: ["title", "sub_title"]
};
</script>
