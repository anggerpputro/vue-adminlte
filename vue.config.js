module.exports = {
	// ...other vue-cli plugin options...
	publicPath: process.env.NODE_ENV === "production" ? "/vueadminlte/" : "/",

	pwa: {
		name: "Vue AdminLTE",
		start_url: "/index.html",
		display: "standalone",
		themeColor: "#3c8dbc",
		msTileColor: "#000000",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "black",

		// configure the manifest options
		manifestOptions: {
			background_color: "#3c8dbc"
			// ...other Manifest options...
		},

		// configure the workbox plugin
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			// swSrc is required in InjectManifest mode.
			swSrc: "src/service-worker.js"
			// ...other Workbox options...
			// cacheId: "pdam-survey-pelanggan"
		}
	}
};
