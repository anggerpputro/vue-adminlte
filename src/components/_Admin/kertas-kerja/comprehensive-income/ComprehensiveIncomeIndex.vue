<template>
	<div class="box box-primary">
		<BoxHeader>
			<button
				style="margin-left: 5px !important; margin-right: 5px !important"
				class="btn btn-success btn-sm pull-left"
				@click="btnAddMultipleClicked"
			>
				<strong>
					<i class="fa fa-plus-circle"></i> Add Multiple
				</strong>
			</button>
		</BoxHeader>

		<div class="box-body">
			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th class="text-center">No.</th>
							<th class="text-center">Periode</th>
							<th class="text-center">Stock Code</th>
							<th class="text-center">Satuan</th>
							<th class="text-center">Revenue</th>
							<th class="text-center">COGS</th>
							<th class="text-center">Gross Profit</th>
							<th class="text-center">Operating Profit</th>
							<th class="text-center">Profit Before Tax</th>
							<th class="text-center">Profit</th>
							<th class="text-center">Comprehensive Income</th>
							<th class="text-center">Basic EPS</th>
							<!-- <th class="text-center">Act.</th> -->
						</tr>
					</thead>

					<tbody>
						<tr v-for="(row, index) in indexData" :key="index">
							<td class="text-right">{{ index+1 }}.</td>
							<td class="text-center">{{ row.periode }}</td>
							<td class="text-center text-bold">{{ row.stock_code }}</td>
							<td class="text-center">{{ row.satuan | toCurrency }}</td>
							<ColMoney :money="row.revenue*row.satuan"/>
							<ColMoney :money="row.cogs*row.satuan"/>
							<ColMoney :money="row.gross_profit*row.satuan"/>
							<ColMoney :money="row.operating_profit*row.satuan"/>
							<ColMoney :money="row.profit_before_tax*row.satuan"/>
							<ColMoney :money="row.profit*row.satuan"/>
							<ColMoney :money="row.comprehensive_income*row.satuan"/>
							<ColMoney :money="row.basic_eps"/>
							<!-- <td class="text-center">
								<router-link :to="{path:'/comprehensive-income/create', query: {edit: true, id: row.id}}">
									<a class="text-primary">
										<i class="glyphicon glyphicon-edit"></i>
									</a>
								</router-link>&nbsp;&nbsp;
								<a
								class="text-danger"
								href="#"
								@click.prevent="deleteStock(row.id, row.stock_code)"
							>
								<i class="glyphicon glyphicon-trash"></i>
								</a>
							</td>-->
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import BoxHeader from "@/components/box/BoxHeader.vue";
import ColMoney from "@/components/table/ColMoney.vue";

import axios from "axios";

export default {
	components: {
		BoxHeader,
		ColMoney
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
			.get("/comprehensive-income")
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
		deleteStock(id, stock_code) {
			if (confirm("Delete Stock (" + stock_code + ")?")) {
				this.$store.commit("showGlobalLoader", true);
				axios
					.delete("/comprehensive-income/" + id)
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
		},
		btnAddMultipleClicked() {
			this.$router.replace("/comprehensive-income/create-multiple");
		}
	}
};
</script>
