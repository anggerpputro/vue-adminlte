<template>
	<div class="box box-primary">
		<BoxHeader
			btnBackUrl="/common-sizing-comprehensive-income"
			titleCenter="Ranking"
			:showSearch="false"
		>
			<div class="pull-right">
				<input type="text" class="form-control" v-model="tahun" @keyup.enter.prevent="refreshData">
			</div>
		</BoxHeader>

		<div class="box-body">
			<div class="table-responsive">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th class="text-center" rowspan="2">No.</th>
							<th class="text-center" rowspan="2">Stock Name</th>
							<th class="text-center" rowspan="2">Stock Code</th>
							<th class="text-center" colspan="2">{{ tahun }}</th>
							<th class="text-center" colspan="2">{{ tahun-1 }}</th>
							<th class="text-center" colspan="2">{{ tahun-2 }}</th>
							<th class="text-center" colspan="2">{{ tahun-3 }}</th>
							<th class="text-center" rowspan="2">Sharia</th>
							<th class="text-center" rowspan="2">Sector</th>
							<th class="text-center" rowspan="2">Sub Sector</th>
						</tr>
						<tr>
							<th class="text-center">Comprehensive Income</th>
							<th class="text-center">Percent</th>
							<th class="text-center">Comprehensive Income</th>
							<th class="text-center">Percent</th>
							<th class="text-center">Comprehensive Income</th>
							<th class="text-center">Percent</th>
							<th class="text-center">Comprehensive Income</th>
							<th class="text-center">Percent</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(item, i) in ranking" :key="i">
							<td class="text-right">{{ i+1 }}.</td>
							<td class="text-left" nowrap>{{ item.data.stock.name }}</td>
							<td class="text-center">
								<strong>{{ item.data.stock_code }}</strong>
							</td>
							<!-- PERCENT TAHUN -->
							<ColMoney :money="item.data.revenue*item.data.satuan"/>
							<td class="text-right">
								<strong
									class="padding-5"
									:class="(item.comprehensive_income_percent<=7.5 ? 'bg-red text-danger' : (item.comprehensive_income_percent>=15 ? 'bg-green text-success' : 'bg-yellow text-warning'))"
								>{{ item.comprehensive_income_percent }}%</strong>
							</td>
							<!-- PERCENT TAHUN SBL -->
							<ColMoney :money="(i in ranking_1) ? ranking_1[i].revenue*ranking_1[i].satuan : '-'"/>
							<td class="text-right" v-if="i in ranking_1">
								<strong
									class="padding-5"
									:class="(ranking_1[i].comprehensive_income_percent_number<=7.5 ? 'bg-red text-danger' : (ranking_1[i].comprehensive_income_percent_number>=15 ? 'bg-green text-success' : 'bg-yellow text-warning'))"
								>{{ ranking_1[i].comprehensive_income_percent_number }}%</strong>
							</td>
							<td class="text-right" v-else>{{ '-' }}</td>
							<!-- PERCENT TAHUN SBL SBL -->
							<ColMoney :money="ranking_2[i] ? ranking_2[i].revenue*ranking_2[i].satuan : '-'"/>
							<td class="text-right" v-if="ranking_2[i]">
								<strong
									class="padding-5"
									:class="(ranking_2[i].comprehensive_income_percent_number<=7.5 ? 'bg-red text-danger' : (ranking_2[i].comprehensive_income_percent_number>=15 ? 'bg-green text-success' : 'bg-yellow text-warning'))"
								>{{ ranking_2[i].comprehensive_income_percent_number }}%</strong>
							</td>
							<td class="text-right" v-else>-</td>
							<!-- PERCENT TAHUN SBL SBL SBL -->
							<ColMoney :money="ranking_3[i] ? ranking_3[i].revenue*ranking_3[i].satuan : '-'"/>
							<td class="text-right" v-if="ranking_3[i]">
								<strong
									class="padding-5"
									:class="(ranking_3[i].comprehensive_income_percent_number<=7.5 ? 'bg-red text-danger' : (ranking_3[i].comprehensive_income_percent_number>=15 ? 'bg-green text-success' : 'bg-yellow text-warning'))"
								>{{ ranking_3[i].comprehensive_income_percent_number }}%</strong>
							</td>
							<td class="text-right" v-else>-</td>
							<!-- ENDOF-PERCENT DATA -->
							<td class="text-center text-success" v-if="item.data.stock && item.data.stock.sharia">Yes</td>
							<td
								class="text-center text-danger text-bold"
								v-else-if="item.data.stock && !item.data.stock.sharia"
							>No</td>
							<td class="text-center" v-else></td>
							<td
								class="text-left"
								nowrap
							>{{ (item.data.stock && item.data.stock.sub_sector) ? item.data.stock.sub_sector.sector.name : '' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (item.data.stock && item.data.stock.sub_sector) ? item.data.stock.sub_sector.name : '' }}</td>
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
			tahun: new Date().getFullYear() - 1,
			ranking: [],
			ranking_1: [],
			ranking_2: [],
			ranking_3: []
		};
	},
	created() {
		this.refreshData();
	},
	methods: {
		refreshData() {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/comprehensive-income/common-sizing-rank/" + this.tahun)
				.then(response => {
					const data = response.data.data;

					this.ranking = data;

					this.$store.commit("showGlobalLoader", false);

					this.getDataLalu();
				})
				.catch(e => {
					this.$store.commit("showGlobalLoader", false);
					console.error(e);
				});
		},
		getDataLalu() {
			this.ranking_1 = [];
			this.ranking_2 = [];
			this.ranking_3 = [];
			for (let i = 0; i < this.ranking.length; i++) {
				const item = this.ranking[i];

				const stock_code = item.data.stock_code;
				const tahun_1 = this.tahun - 1;
				const tahun_2 = this.tahun - 2;
				const tahun_3 = this.tahun - 3;

				axios
					.get(
						"/comprehensive-income/common-sizing/" +
							stock_code +
							"/periode/" +
							tahun_1
					)
					.then(response => {
						this.ranking_1[i] = response.data.data;
						this.$forceUpdate();
					})
					.catch(e => {
						console.error(e);
					});

				axios
					.get(
						"/comprehensive-income/common-sizing/" +
							stock_code +
							"/periode/" +
							tahun_2
					)
					.then(response => {
						this.ranking_2[i] = response.data.data;
						this.$forceUpdate();
					})
					.catch(e => {
						console.error(e);
					});

				axios
					.get(
						"/comprehensive-income/common-sizing/" +
							stock_code +
							"/periode/" +
							tahun_3
					)
					.then(response => {
						this.ranking_3[i] = response.data.data;
						this.$forceUpdate();
					})
					.catch(e => {
						console.error(e);
					});
			}
		}
	}
};
</script>
