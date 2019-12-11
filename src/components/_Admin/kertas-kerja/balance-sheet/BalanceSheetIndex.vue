<template>
	<div class="box box-primary">
		<BoxHeader btnAddUrl="/balance-sheet/create"></BoxHeader>

		<div class="box-body">
			<table class="table table-striped">
				<thead>
					<tr>
						<th class="text-center">No.</th>
						<th class="text-center">Periode</th>
						<th class="text-center">Stock Code</th>
						<th class="text-center">Kas</th>
						<th class="text-center">Piutang Usaha</th>
						<th class="text-center">Persediaan</th>
						<th class="text-center">Aset Lancar</th>
						<th class="text-center">Aset Tdk Lancar</th>
						<th class="text-center">Liab. Pendek</th>
						<th class="text-center">Liab. Panjang</th>
						<th class="text-center">Ekuitas</th>
						<th class="text-center">Act.</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(row, index) in indexData" :key="index">
						<td class="text-right">{{ index+1 }}.</td>
						<td class="text-center">{{ row.periode }}</td>
						<td class="text-center">{{ row.stock_code }}</td>
						<td class="text-right">{{ row.kas | toCurrency }}</td>
						<td class="text-right">{{ row.piutang_usaha | toCurrency }}</td>
						<td class="text-right">{{ row.persediaan | toCurrency }}</td>
						<td class="text-right">{{ row.total_aset_lancar | toCurrency }}</td>
						<td class="text-right">{{ row.total_aset_tidak_lancar | toCurrency }}</td>
						<td class="text-right">{{ row.total_liabilitas_jangka_pendek | toCurrency }}</td>
						<td class="text-right">{{ row.total_liabilitas_jangka_panjang | toCurrency }}</td>
						<td class="text-right">{{ row.total_ekuitas | toCurrency }}</td>
						<td class="text-center">
							<router-link :to="{path:'/balance-sheet/create', query: {edit: true, id: row.id}}">
								<a class="text-primary">
									<i class="glyphicon glyphicon-edit"></i>
								</a>
							</router-link>&nbsp;&nbsp;
							<a
								class="text-danger"
								href="#"
								@click.prevent="deleteRow(row.id, row.stock_code)"
							>
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
			.get("/balance-sheet")
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
		deleteRow(id, stock_code) {
			if (confirm("Delete Row (" + stock_code + ")?")) {
				this.$store.commit("showGlobalLoader", true);
				axios
					.delete("/balance-sheet/" + id)
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
