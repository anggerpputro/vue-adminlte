<template>
	<div class="box box-primary">
		<div class="box-header">
			<h3 class="box-title">Stock Score</h3>
		</div>

		<div class="box-body">
			<form action="get" class="form">
				<div>
					<label for>Index Selected:</label>
				</div>
				<div class="form-group">
					<label class="checkbox-inline">
						<input type="checkbox" value="LQ45" v-model="indexSelected"> LQ45
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" value="JII" v-model="indexSelected"> JII
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" value="IDX30" v-model="indexSelected"> IDX30
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" value="IDXHIDIV20" v-model="indexSelected"> IDXHIDIV20
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" value="IDXBUMN20" v-model="indexSelected"> IDXBUMN20
					</label>
				</div>
				<div class="form-group">
					<label for>Tahun:</label>
					<div class="row">
						<div class="col-sm-4 col-md-2">
							<input type="text" class="form-control" v-model="yearStart">
						</div>
						<div class="col-sm-4 col-md-2">
							<input type="text" class="form-control" v-model="yearEnd">
						</div>
					</div>
				</div>
				<div class="form-group">
					<button class="btn btn-primary" @click.prevent="refreshData">Refresh Data</button>
				</div>
			</form>

			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th class="text-center">No.</th>
							<th class="text-center" nowrap>Stock Code</th>
							<th class="text-center" nowrap>Stock Name</th>
							<th class="text-center">Sharia</th>
							<th class="text-center">Score</th>
							<th class="text-center" nowrap>Score Group</th>
							<th class="text-center">Sector</th>
							<th class="text-center">Sub-Sector</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(score, i) in scoreHigh" :key="i+'high'">
							<td class="text-right">{{ i+1 }}.</td>
							<td class="text-center">{{ score.stock_code }}</td>
							<td class="text-left" nowrap>{{ (score.stock) ? score.stock.name : '' }}</td>
							<td class="text-center text-success" v-if="score.stock && score.stock.sharia">Yes</td>
							<td
								class="text-center text-danger text-bold"
								v-else-if="score.stock && !score.stock.sharia"
							>No</td>
							<td class="text-center" v-else></td>
							<td class="text-center">{{ score.score }}</td>
							<td class="text-center text-bold text-success">{{ 'High' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.sector.name : '' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.name : '' }}</td>
						</tr>

						<tr v-for="(score, i) in scoreMedium" :key="i+'medium'">
							<td class="text-right">{{ i+scoreHigh.length+1 }}.</td>
							<td class="text-center">{{ score.stock_code }}</td>
							<td class="text-left" nowrap>{{ (score.stock) ? score.stock.name : '' }}</td>
							<td class="text-center text-success" v-if="score.stock && score.stock.sharia">Yes</td>
							<td
								class="text-center text-danger text-bold"
								v-else-if="score.stock && !score.stock.sharia"
							>No</td>
							<td class="text-center" v-else></td>
							<td class="text-center">{{ score.score }}</td>
							<td class="text-center text-bold text-warning">{{ 'Medium' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.sector.name : '' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.name : '' }}</td>
						</tr>

						<tr v-for="(score, i) in scoreLow" :key="i+'low'">
							<td class="text-right">{{ i+scoreHigh.length+scoreMedium.length+1 }}.</td>
							<td class="text-center">{{ score.stock_code }}</td>
							<td class="text-left" nowrap>{{ (score.stock) ? score.stock.name : '' }}</td>
							<td class="text-center text-success" v-if="score.stock && score.stock.sharia">Yes</td>
							<td
								class="text-center text-danger text-bold"
								v-else-if="score.stock && !score.stock.sharia"
							>No</td>
							<td class="text-center" v-else></td>
							<td class="text-center">{{ score.score }}</td>
							<td class="text-center text-bold text-danger">{{ 'Low' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.sector.name : '' }}</td>
							<td
								class="text-left"
								nowrap
							>{{ (score.stock && score.stock.sub_sector) ? score.stock.sub_sector.name : '' }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			no: 1,
			stockScore: null,
			scoreHigh: null,
			scoreMedium: null,
			scoreLow: null,
			indexSelected: [],
			yearStart: new Date().getFullYear() - 3,
			yearEnd: new Date().getFullYear()
		};
	},
	created() {
		this.refreshData();
	},
	methods: {
		refreshData() {
			this.$store.commit("showGlobalLoader", true);
			axios
				.get("/market-index-details/stock-score?withStockData=true", {
					params: {
						indexSelected: this.indexSelected,
						yearStart: this.yearStart,
						yearEnd: this.yearEnd
					}
				})
				.then(response => {
					const data = response.data.data;
					this.stockScore = data.scores;

					this.scoreHigh = data.high;
					this.scoreMedium = data.medium;
					this.scoreLow = data.low;

					this.$store.commit("showGlobalLoader", false);
				})
				.catch(e => {
					this.$store.commit("showGlobalLoader", false);
					console.error(e);
				});
		}
	}
};
</script>
