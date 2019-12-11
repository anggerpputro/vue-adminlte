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
							<th class="text-center">Price</th>
							<th class="text-center">O/S Share</th>
							<th class="text-center">Market Cap</th>
							<th class="text-center">P/E (x)</th>
							<th class="text-center">PBV (x)</th>
							<th class="text-center">ROA (%)</th>
							<th class="text-center">NPM (%)</th>
							<th class="text-center">ROE (%)</th>
							<th class="text-center">OPM (%)</th>
							<th class="text-center">DER (%)</th>
							<th class="text-center">Assets</th>
							<th class="text-center">Liability</th>
							<th class="text-center">Equity</th>
							<th class="text-center">BV/Share</th>
							<th class="text-center">Revenue</th>
							<th class="text-center">Operating Profit</th>
							<th class="text-center">Net Profit</th>
							<th class="text-center">EPS</th>
							<!-- <th class="text-center">Act.</th> -->
						</tr>
					</thead>

					<tbody>
						<tr v-for="(row, index) in indexData" :key="index">
							<td class="text-right">{{ index+1 }}.</td>
							<td class="text-center">{{ row.year }} (Q{{ row.quartal }})</td>
							<td class="text-center text-bold">{{ row.stock_code }}</td>

							<ColMoney :money="row.price" />
							<ColMoney :money="row.o_to_s_share" />
							<ColMoney :money="row.market_cap" />

							<ColMoney :money="row.p_to_e" />
							<ColMoney :money="row.pbv" />
							<ColMoney :money="row.npm" />
							<ColMoney :money="row.opm" />
							<ColMoney :money="row.roa" />
							<ColMoney :money="row.roe" />
							<ColMoney :money="row.der" />

							<ColMoney :money="row.assets" />
							<ColMoney :money="row.liability" />
							<ColMoney :money="row.equity" />
							<ColMoney :money="row.bv_per_share" />

							<ColMoney :money="row.revenue" />
							<ColMoney :money="row.operating_profit" />
							<ColMoney :money="row.net_profit" />
							<ColMoney :money="row.eps" />
							<!-- <td class="text-center">
								<router-link :to="{path:'/general-fundamental/create', query: {edit: true, id: row.id}}">
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
			.get("/general-fundamental")
			.then(response => {
				this.indexResponseData = response.data;
				this.indexData = response.data.data.data;
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
					.delete("/general-fundamental/" + id)
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
			this.$router.replace("/general-fundamental/create-multiple");
		}
	}
};
</script>
