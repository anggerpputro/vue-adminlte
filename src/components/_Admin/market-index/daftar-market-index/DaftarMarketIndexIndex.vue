<template>
	<div class="box box-primary">
		<BoxHeader btnAddUrl="/market-index/create"></BoxHeader>

		<div class="box-body">
			<div v-for="(row, index) in indexData" :key="index">
				<h3 class="box-title">{{ (index+1) }}. {{ row.index_name + ' ('+ row.periode +')' }}</h3>
				<table class="table table-striped">
					<thead>
						<tr>
							<th class="text-center">No.</th>
							<th class="text-center">Periode</th>
							<th class="text-center">Index Name</th>
							<th class="text-center">Stock Code</th>
							<th class="text-center">Act.</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(detail, indexDetail) in row.details" :key="indexDetail">
							<td class="text-right">{{ indexDetail+1 }}.</td>
							<td class="text-center">{{ row.periode }}</td>
							<td class="text-center">{{ row.index_name }}</td>
							<td class="text-center">{{ detail.stock_code }}</td>
							<td class="text-center">
								<router-link :to="{path:'/market-index/create', query: {edit: true, id: row.id}}">
									<a class="text-primary">
										<i class="glyphicon glyphicon-edit"></i>
									</a>
								</router-link>&nbsp;&nbsp;
								<a class="text-danger" href="#" @click.prevent="deleteRow(row.id, row.name)">
									<i class="glyphicon glyphicon-trash"></i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import BoxHeader from "@/components/box/BoxHeader.vue";

import axios from "axios";

export default {
	components: {
		BoxHeader
	},
	data() {
		return {
			indexResponseData: null,
			indexData: null
		};
	},
	created() {
		this.$store.commit("showGlobalLoader", true);
		axios
			.get("/market-index/with-details")
			.then(response => {
				this.indexResponseData = response.data;
				this.indexData = response.data.data;
				this.$store.commit("showGlobalLoader", false);
			})
			.catch(e => {
				this.$store.commit("showGlobalLoader", false);
				console.error(e);
			});
	},
	methods: {
		deleteRow(id, name) {
			if (confirm("Delete Row (" + name + ")?")) {
				this.$store.commit("showGlobalLoader", true);
				axios
					.delete("/market-index/" + id)
					.then(response => {
						this.$store.commit("showGlobalLoader", false);
						this.indexData.forEach((item, index) => {
							if (item.id == id) {
								this.indexData.splice(index, 1);
							}
						});
					})
					.catch(e => {
						this.$store.commit("showGlobalLoader", false);
						console.error(e);
					});
			}
		}
	}
};
</script>
