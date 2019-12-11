<template>
	<div class="form form-horizontal">
		<div class="form-group">
			<label class="control-label col-md-4">Kode Stock</label>
			<div class="col-md-6">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-4">Nama Stock</label>
			<div class="col-md-6">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-4">Sector</label>
			<div class="col-md-6">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-4">Sub-Sector</label>
			<div class="col-md-6">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-4">Syariah</label>
			<div class="col-md-6">
				<div class="radio">
					<label>
						<input type="radio" name="optionsRadios" value="Ya" checked>
						Ya
					</label>
				</div>
				<div class="radio">
					<label>
						<input type="radio" name="optionsRadios" value="Tidak">
						Tidak
					</label>
				</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-offset-4 col-md-6">
				<button class="btn btn-primary">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>
