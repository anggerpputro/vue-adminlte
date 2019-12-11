<template>
	<td class="text-right text-success text-bold" :width="width" v-if="money > 0">
		{{ money | toCurrency }}
		<slot></slot>
	</td>
	<td class="text-right" :width="width" v-else-if="money == 0">
		{{ money | toCurrency }}
		<slot></slot>
	</td>
	<td class="text-right text-danger text-bold" :width="width" v-else>
		<i>({{ money | toCurrency }})</i>
		<slot></slot>
	</td>
</template>

<script>
export default {
	props: {
		money: {
			default: 0
		},
		width: {
			default: "100%"
		}
	}
};
</script>
