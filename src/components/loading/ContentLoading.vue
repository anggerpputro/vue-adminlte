<template>
	<div class="row">
		<div class="col-sm-12">
			<ContentLoader/>
			<FacebookLoader height="150"/>
			<CodeLoader/>
			<BulletListLoader/>
			<InstagramLoader/>
			<ListLoader/>
		</div>
	</div>
</template>

<script>
import {
	ContentLoader,
	FacebookLoader,
	CodeLoader,
	BulletListLoader,
	InstagramLoader,
	ListLoader
} from "vue-content-loader";

export default {
	components: {
		ContentLoader,
		FacebookLoader,
		CodeLoader,
		BulletListLoader,
		InstagramLoader,
		ListLoader
	}
};
</script>
