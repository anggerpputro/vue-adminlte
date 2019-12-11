<template>
	<div class="box box-default">
		<div class="box-header text-center">
			<h5 class="box-title text-success">
				<strong>
					<i>
						<u>
							<span class="fa fa-spinner fa-spin"></span> Loading...
						</u>
					</i>
				</strong>
			</h5>
		</div>
		<div class="box-body">
			<div class="row">
				<div class="col-sm-12">
					<ContentLoader height="10" secondaryColor="#eaeaea" speed="2">
						<rect x="0" y="0" rx="3" ry="3" width="10%" height="7"/>
						<rect x="80%" y="0" rx="3" ry="3" width="20%" height="7"/>
					</ContentLoader>

					<ContentLoader height="10" primaryColor="#ececec" secondaryColor="#dedede" speed="2">
						<rect x="0" y="0" rx="3" ry="3" width="100%" height="1"/>
					</ContentLoader>

					<ContentLoader v-for="i in 10" :key="i" height="12" secondaryColor="#ececec" speed="2">
						<rect x="2%" y="0" rx="3" ry="3" width="5%" height="4"/>
						<rect x="12%" y="0" rx="3" ry="3" width="10%" height="4"/>
						<rect x="27%" y="0" rx="3" ry="3" width="20%" height="4"/>
						<rect x="55%" y="0" rx="3" ry="3" width="25%" height="4"/>
						<rect x="88%" y="0" rx="3" ry="3" width="9%" height="4"/>
					</ContentLoader>

					<ContentLoader height="8" primaryColor="#ececec" secondaryColor="#dedede" speed="2">
						<rect x="0" y="0" rx="3" ry="3" width="100%" height="1"/>
					</ContentLoader>

					<ContentLoader height="15" secondaryColor="#eaeaea" speed="2">
						<rect x="0" y="0" rx="3" ry="3" width="25%" height="6"/>
						<rect x="70%" y="0" rx="3" ry="3" width="30%" height="6"/>
					</ContentLoader>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
	components: {
		ContentLoader
	}
};
</script>

<style scoped>
.box-header {
	position: fixed;
	top: 5px;
	width: 80%;
	z-index: 5000;
}

.box {
	background: #fbfbfb;
	box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.15);
}
</style>
