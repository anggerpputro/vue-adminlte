<template>
	<div>
		<table class="table table-bordered table-condensed table-striped">
			<thead>
				<tr>
					<th rowspan="2" colspan="2" class="text-center center-vertical" width="50%">ISIAN</th>
					<th colspan="2" class="text-center" width="50%">PERIODE</th>
				</tr>
				<tr>
					<th>
						<input class="form-control" type="text" v-model="periode.lalu">
					</th>
					<th>
						<input class="form-control" type="text" v-model="periode.skrg">
					</th>
				</tr>
			</thead>

			<tbody>
				<table-input label="Kode Saham">
					<td colspan="2">
						<input class="form-control" type="text" v-model="kode_saham">
					</td>
				</table-input>
				<tr>
					<th colspan="4" class="text-primary">
						<small>
							<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
						</small>
						BALANCE SHEET:
					</th>
				</tr>
				<table-input label="&nbsp;** Total Asset">
					<td>
						<input class="form-control" type="text" v-model="asset.lalu" :placeholder="periode.lalu">
					</td>
					<td>
						<input class="form-control" type="text" v-model="asset.skrg" :placeholder="periode.skrg">
					</td>
				</table-input>
				<table-input label="&nbsp;** Total Liabilitas">
					<td>
						<input class="form-control" type="text" v-model="liabilitas.lalu" :placeholder="periode.lalu">
					</td>
					<td>
						<input class="form-control" type="text" v-model="liabilitas.skrg" :placeholder="periode.skrg">
					</td>
				</table-input>
				<table-input label="&nbsp;** Total Ekuitas">
					<td>
						<input class="form-control" type="text" v-model="ekuitas.lalu" :placeholder="periode.lalu">
					</td>
					<td>
						<input class="form-control" type="text" v-model="ekuitas.skrg" :placeholder="periode.skrg">
					</td>
				</table-input>
				<tr>
					<th colspan="4" class="text-primary">
						<small>
							<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
						</small>
						INCOME STATEMENT:
					</th>
				</tr>
				<table-input label="&nbsp;** Penjualan">
					<td>
						<input class="form-control" type="text" v-model="penjualan.lalu" :placeholder="periode.lalu">
					</td>
					<td>
						<input class="form-control" type="text" v-model="penjualan.skrg" :placeholder="periode.skrg">
					</td>
				</table-input>
				<table-input label="&nbsp;** Laba Kotor">
					<td>
						<input class="form-control" type="text" v-model="laba_kotor.lalu" :placeholder="periode.lalu">
					</td>
					<td>
						<input class="form-control" type="text" v-model="laba_kotor.skrg" :placeholder="periode.skrg">
					</td>
				</table-input>
				<table-input label="&nbsp;** Laba Operasi">
					<td>
						<input
							class="form-control"
							type="text"
							v-model="laba_operasi.lalu"
							:placeholder="periode.lalu"
						>
					</td>
					<td>
						<input
							class="form-control"
							type="text"
							v-model="laba_operasi.skrg"
							:placeholder="periode.skrg"
						>
					</td>
				</table-input>
				<table-input label="&nbsp;** Laba Bersih">
					<td>
						<input
							class="form-control"
							type="text"
							v-model="laba_bersih.lalu"
							:placeholder="periode.lalu"
						>
					</td>
					<td>
						<input
							class="form-control"
							type="text"
							v-model="laba_bersih.skrg"
							:placeholder="periode.skrg"
						>
					</td>
				</table-input>
				<tr>
					<td colspan="4" class="text-center">
						<button class="btn btn-primary">Submit</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import TableInput from "@/components/input/TableInput.vue";

export default {
	components: {
		TableInput
	},
	data() {
		return {
			periode: {
				lalu: new Date().getFullYear() - 1,
				skrg: new Date().getFullYear()
			},
			kode_saham: "",
			asset: {
				lalu: "",
				skrg: ""
			},
			liabilitas: {
				lalu: "",
				skrg: ""
			},
			ekuitas: {
				lalu: "",
				skrg: ""
			},
			penjualan: {
				lalu: "",
				skrg: ""
			},
			laba_kotor: {
				lalu: "",
				skrg: ""
			},
			laba_operasi: {
				lalu: "",
				skrg: ""
			},
			laba_bersih: {
				lalu: "",
				skrg: ""
			}
		};
	}
};
</script>
