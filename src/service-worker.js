if (workbox) {
	workbox.googleAnalytics.initialize();

	// This is the code piece that GenerateSW mode can't provide for us.
	// This code listens for the user's confirmation to update the app.
	self.addEventListener("message", e => {
		if (!e.data) {
			return;
		}

		switch (e.data) {
			case "skipWaiting":
				self.skipWaiting();
				break;
			default:
				// NOOP
				break;
		}
	});

	workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
	// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

	const prefixCacheName = "pdam-survey-pelanggan";
	workbox.core.setCacheNameDetails({ prefix: prefixCacheName });

	/**
	 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
	 * requests for URLs in the manifest.
	 * See https://goo.gl/S9QRab
	 */
	self.__precacheManifest = [].concat(self.__precacheManifest || []);
	// workbox.precaching.suppressWarnings();
	workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

	// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
	workbox.routing.registerRoute(
		/^https:\/\/fonts\.googleapis\.com/,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: "google-fonts-stylesheets"
		})
	);

	// Cache the underlying font files with a cache-first strategy for 1 year.
	workbox.routing.registerRoute(
		/^https:\/\/fonts\.gstatic\.com/,
		new workbox.strategies.CacheFirst({
			cacheName: "google-fonts-webfonts",
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200]
				}),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 365,
					maxEntries: 30,
					purgeOnQuotaError: true
				})
			]
		})
	);

	// Bootstrap
	workbox.routing.registerRoute(
		new RegExp("https://stackpath.bootstrapcdn.com/(.*)"),
		new workbox.strategies.CacheFirst({
			cacheName: "bootstrap",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
					maxEntries: 30
				})
			]
		})
	);

	// cdnjs
	workbox.routing.registerRoute(
		new RegExp("https://cdnjs.cloudflare.com/(.*)"),
		new workbox.strategies.CacheFirst({
			cacheName: "cdnjs",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
					maxEntries: 30
				})
			]
		})
	);

	// Fontawesome
	workbox.routing.registerRoute(
		new RegExp("https://use.fontawesome.com/(.*)"),
		new workbox.strategies.CacheFirst({
			cacheName: "fontawesome",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 30,
					maxEntries: 30,
					purgeOnQuotaError: true
				})
			]
		})
	);

	// jQuery
	workbox.routing.registerRoute(
		new RegExp("https://code.jquery.com/jquery-3.3.1.slim.min.js"),
		new workbox.strategies.CacheFirst({
			cacheName: "jQuery",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 30
				})
			]
		})
	);

	// Dah dihandle di precache
	// workbox.routing.registerRoute(
	// 	/\.(?:js|css)$/,
	// 	new workbox.strategies.StaleWhileRevalidate({
	// 		cacheName: prefixCacheName + "-static-resources"
	// 	})
	// );

	workbox.routing.registerRoute(
		// Cache image files.
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		// Use the cache if it's available.
		new workbox.strategies.CacheFirst({
			// Use a custom cache name.
			cacheName: prefixCacheName + "-image-cache",
			plugins: [
				new workbox.expiration.Plugin({
					// Cache for a maximum of a week.
					maxAgeSeconds: 60 * 60 * 24 * 7,
					// Cache only 30 images.
					maxEntries: 30,
					// Automatically cleanup if quota is exceeded.
					purgeOnQuotaError: true
				})
			]
		})
	);

	// *
	// ***
	// :: API REQUESTS
	// :::
	// import configUrl from "./config-url"; // cannot use import statement outside a module

	// const baseApiUrl = "http://localhost:50080/api";
	// const baseApiUrl = "http://192.168.1.3:8000/api";
	// const baseApiUrl = configUrl.apiBaseURL;
	const baseLaravelUrl =
		"https://app.pdamkotasmg.co.id:58080/pdam-survey-api/public";
	const baseApiUrl =
		"https://app.pdamkotasmg.co.id:58080/pdam-survey-api/public/api";

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/kelurahan/(.*)"),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: prefixCacheName + "-runtime-kelurahan",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 60,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/petugas/(.*)"),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: prefixCacheName + "-runtime-petugas",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 60,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/mcabang(.*)"),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: prefixCacheName + "-runtime-cabang",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 60,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/mkondisirumah(.*)"),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: prefixCacheName + "-runtime-kondisi-rumah",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 60,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/informasi/(.*)"),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: prefixCacheName + "-runtime-informasi",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 60,
					purgeOnQuotaError: true
				})
			]
		})
	);

	// workbox.routing.registerRoute(
	// 	new RegExp(baseApiUrl + "/pelanggan/bendel/(.*)"),
	// 	new workbox.strategies.NetworkFirst({
	// 		cacheName: prefixCacheName + "-runtime-pelanggan-bendel",
	// 		plugins: [
	// 			new workbox.cacheableResponse.Plugin({ statuses: [200] }),
	// 			new workbox.expiration.Plugin({
	// 				maxAgeSeconds: 60 * 60 * 1,
	// 				maxEntries: 100,
	// 				purgeOnQuotaError: true
	// 			})
	// 		]
	// 	})
	// );

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/pelanggan/nolangg/(.*)"),
		new workbox.strategies.NetworkFirst({
			cacheName: prefixCacheName + "-runtime-pelanggan-nolangg",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 30,
					maxEntries: 500,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseApiUrl + "/rekap/me/(.*)"),
		new workbox.strategies.NetworkFirst({
			cacheName: prefixCacheName + "-runtime-rekap-me",
			plugins: [
				new workbox.cacheableResponse.Plugin({ statuses: [200] }),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 30,
					maxEntries: 100,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp(baseLaravelUrl + "/foto/(.*)"),
		new workbox.strategies.CacheFirst({
			// Use a custom cache name.
			cacheName: prefixCacheName + "-runtime-foto-cache",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 500,
					purgeOnQuotaError: true
				})
			]
		})
	);

	workbox.routing.registerRoute(
		/^https:\/\/(.*).(?:jpg|jpeg|png)(.*)/,
		new workbox.strategies.CacheFirst({
			// Use a custom cache name.
			cacheName: prefixCacheName + "-runtime-image-cache",
			plugins: [
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24,
					maxEntries: 100,
					purgeOnQuotaError: true
				})
			]
		})
	);
}
