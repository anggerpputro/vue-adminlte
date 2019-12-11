<template>
	<div class="box box-primary">
		<BoxHeader btnAddUrl="/master-stock/create"></BoxHeader>

		<div class="box-body">
			<table class="table table-striped">
				<thead>
					<tr>
						<th class="text-center">No.</th>
						<th class="text-center">Code</th>
						<th class="text-center">Name</th>
						<th class="text-center">Sharia</th>
						<th class="text-center">Sector</th>
						<th class="text-center">Sub-Sector</th>
						<th class="text-center">Act.</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(row, index) in indexData" :key="index">
						<td class="text-right">{{ index+1 }}.</td>
						<td class="text-center">{{ row.stock_code }}</td>
						<td>{{ row.name }}</td>
						<td class="text-center">{{ row.sharia ? 'Yes' : 'No' }}</td>
						<td>{{ (row.sub_sector && row.sub_sector.sector) ? row.sub_sector.sector.name : '' }}</td>
						<td>{{ (row.sub_sector) ? row.sub_sector.name : '' }}</td>
						<td class="text-center">
							<router-link :to="{path:'/master-stock/create', query: {edit: true, id: row.id}}">
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
			.get("/stock")
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
					.delete("/stock/" + id)
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
