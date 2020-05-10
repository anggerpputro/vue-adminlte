<template>
	<div id="app-container" :class="{ loaded: !showGlobalLoader }">
		<div id="loader-wrapper">
			<!-- <h2 id="loader-title" class="box-title text-center">Please Wait...</h2> -->
			<div id="loader"></div>

			<div class="loader-section section-left"></div>
			<div class="loader-section section-right"></div>
		</div>

		<notifications group="general" position="center top" />

		<transition name="slide" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			refreshing: false,
			registration: null,
			updateExists: false
		};
	},
	computed: {
		...mapGetters(["showGlobalLoader"])
	},
	created() {
		document.addEventListener("swUpdated", this.showRefreshUI, {
			once: true
		});

		navigator.serviceWorker.addEventListener("controllerchange", () => {
			if (this.refreshing) return;
			this.refreshing = true;
			window.location.reload();
		});
	},
	methods: {
		showRefreshUI(e) {
			this.registration = e.detail;
			this.updateExists = true;

			if (
				confirm(
					"Versi Baru Berhasil Terinstall. Restart Aplikasi Sekarang?"
				)
			) {
				this.refreshApp();
			}
		},
		refreshApp() {
			this.updateExists = false;
			if (!this.registration || !this.registration.waiting) {
				return;
			}
			this.registration.waiting.postMessage("skipWaiting");
		}
	}
};
</script>

<style>
.slide-enter-active {
	animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
	animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
	from {
		transform: translateY(-30px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes slide-out {
	from {
		transform: translateY(0);
		opacity: 1;
	}
	to {
		transform: translateY(-30px);
		opacity: 0;
	}
}

.slide-horizontal-enter-active {
	animation: slide-horizontal-in 200ms ease-out forwards;
}

.slide-horizontal-leave-active {
	animation: slide-horizontal-out 200ms ease-out forwards;
}

@keyframes slide-horizontal-in {
	from {
		transform: translateX(-30px);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}

@keyframes slide-horizontal-out {
	from {
		transform: translateX(0);
		opacity: 1;
	}
	to {
		transform: translateX(-30px);
		opacity: 0;
	}
}

.center-vertical {
	vertical-align: middle !important;
}
.padding-5 {
	padding: 5px !important;
}

.text-white {
	color: white !important;
}

#loader-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;
}
#loader-title {
	position: fixed;
	top: 15%;
	width: 100%;
	color: #eeeeee;
	text-shadow: 2px 2px 2px #dddddd;
	z-index: 10001;
}
#loader {
	display: block;
	position: relative;
	left: 50%;
	top: 50%;
	width: 150px;
	height: 150px;
	margin: -75px 0 0 -75px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #3498db;

	-webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
	animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */

	z-index: 10001;
}

#loader:before {
	content: "";
	position: absolute;
	top: 5px;
	left: 5px;
	right: 5px;
	bottom: 5px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #e74c3c;

	-webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
	animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

#loader:after {
	content: "";
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #f9c922;

	-webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
	animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
		-ms-transform: rotate(0deg); /* IE 9 */
		transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
	}
	100% {
		-webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
		-ms-transform: rotate(360deg); /* IE 9 */
		transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
	}
}
@keyframes spin {
	0% {
		-webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
		-ms-transform: rotate(0deg); /* IE 9 */
		transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
	}
	100% {
		-webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
		-ms-transform: rotate(360deg); /* IE 9 */
		transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
	}
}

#loader-wrapper .loader-section {
	position: fixed;
	top: 0;
	width: 50%;
	height: 100%;
	background: #222222;
	opacity: 0.65;
	z-index: 10000;
	-webkit-transform: translateX(0); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateX(0); /* IE 9 */
	transform: translateX(0); /* Firefox 16+, IE 10+, Opera */
}

#loader-wrapper .loader-section.section-left {
	/* left: 0; */
	-webkit-transform: translateX(0%); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateX(0%); /* IE 9 */
	transform: translateX(0%); /* Firefox 16+, IE 10+, Opera */

	-webkit-transition: all 0.5s 0s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.5s 0s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#loader-wrapper .loader-section.section-right {
	right: 0;
	-webkit-transform: translateX(0%); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateX(0%); /* IE 9 */
	transform: translateX(0%); /* Firefox 16+, IE 10+, Opera */

	-webkit-transition: all 0.5s 0s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.5s 0s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* Loaded */
.loaded #loader-wrapper .loader-section.section-left {
	-webkit-transform: translateX(-100%); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateX(-100%); /* IE 9 */
	transform: translateX(-100%); /* Firefox 16+, IE 10+, Opera */

	-webkit-transition: all 0.4s 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.4s 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded #loader-wrapper .loader-section.section-right {
	-webkit-transform: translateX(100%); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateX(100%); /* IE 9 */
	transform: translateX(100%); /* Firefox 16+, IE 10+, Opera */

	-webkit-transition: all 0.4s 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.4s 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded #loader {
	opacity: 0;
	-webkit-transition: all 0.55s ease-out;
	transition: all 0.55s ease-out;
}
.loaded #loader-wrapper {
	visibility: hidden;

	-webkit-transform: translateY(-100%); /* Chrome, Opera 15+, Safari 3.1+ */
	-ms-transform: translateY(-100%); /* IE 9 */
	transform: translateY(-100%); /* Firefox 16+, IE 10+, Opera */

	-webkit-transition: all 0.45s 0.6s ease-out;
	transition: all 0.45s 0.6s ease-out;
}

/* JavaScript Turned Off */
.no-js #loader-wrapper {
	display: none;
}
.no-js h1 {
	color: #222222;
}
</style>
