<template>
	<div id="general-container">
		<ContentHeader :title="title" :sub_title="sub_title" />

		<!-- Main content -->
		<section class="content">
			<slot></slot>
		</section>
		<!-- /.content -->
	</div>
</template>

<script>
import ContentHeader from "@/components/admin-lte/ContentHeader.vue";

export default {
	props: ["title", "sub_title"],
	components: {
		ContentHeader
	}
};
</script>
