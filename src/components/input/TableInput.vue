<template>
	<tr>
		<th class="center-vertical" v-html="label"></th>
		<th class="text-center center-vertical">:</th>
		<slot></slot>
	</tr>
</template>

<script>
export default {
	props: ["label"]
};
</script>
